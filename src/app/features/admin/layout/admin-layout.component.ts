import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideChevronLeft,
  LucideLogOut,
  LucideMenu,
  LucideMoon,
  LucideSearch,
  LucideSun,
  LucideUser,
  LucideX,
} from '@lucide/angular';
import { filter } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminDataService } from '../services/admin-data.service';
import { AdminFlashService } from '../services/admin-flash.service';
import { AdminFlashComponent } from '../shared/admin-flash.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgComponentOutlet,
    AdminFlashComponent,
    LucideChevronLeft,
    LucideX,
    LucideUser,
    LucideMoon,
    LucideSun,
    LucideLogOut,
    LucideMenu,
    LucideSearch,
  ],
  templateUrl: './admin-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class AdminLayoutComponent {
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  protected readonly auth = inject(AdminAuthService);
  protected readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  private readonly profileMenuRef = viewChild<ElementRef<HTMLElement>>('profileMenu');
  private readonly searchMenuRef = viewChild<ElementRef<HTMLElement>>('searchMenu');

  protected readonly collapsed = signal(this.readStorage('sidebarCollapsed') === '1');
  protected readonly darkMode = signal(this.readStorage('darkMode') === '1');
  protected readonly mobileOpen = signal(false);
  protected readonly profileMenuOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly searchOpen = signal(false);

  protected readonly settings = this.data.settings;
  protected readonly user = this.auth.currentUser;
  protected readonly badges = this.data.sidebarBadges;
  protected readonly menuSections = this.data.menuSections;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly schoolName = computed(() => this.settings().schoolName);
  protected readonly academicYear = computed(() => this.settings().academicYear);
  protected readonly currentRoute = signal(this.router.url.split('?')[0]);

  protected readonly currentBreadcrumb = computed(() => {
    const path = this.currentRoute();
    for (const group of this.menuSections) {
      const matched = group.items.find(
        (item) => path === item.route || path.startsWith(item.route + '/'),
      );
      if (matched) {
        return { section: group.section, label: matched.label, route: matched.route };
      }
    }
    if (path.startsWith('/admin/profile')) {
      return { section: 'Account', label: 'My Profile', route: '/admin/profile' };
    }
    if (path.startsWith('/admin/about')) {
      return { section: 'System', label: 'About App', route: '/admin/about' };
    }
    return { section: 'Admin', label: 'Control Panel', route: '/admin/dashboard' };
  });

  protected readonly searchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const items = this.menuSections.flatMap((group) =>
      group.items.map((item) => ({
        section: group.section,
        label: item.label,
        route: item.route,
        icon: item.icon,
      })),
    );
    const filtered = q
      ? items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) || item.section.toLowerCase().includes(q),
        )
      : items;
    return filtered.slice(0, 8);
  });

  constructor() {
    this.data.loadAll();

    effect(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', this.darkMode());
      }
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.mobileOpen.set(false);
        this.profileMenuOpen.set(false);
        this.searchOpen.set(false);
        const path = event.urlAfterRedirects.split('?')[0];
        this.currentRoute.set(path);
        const pageTitle = this.currentBreadcrumb().label;
        this.titleService.setTitle(`${pageTitle} | ${this.schoolName()}`);
      });
  }

  protected toggleCollapse(): void {
    this.collapsed.update((prev) => {
      const next = !prev;
      this.writeStorage('sidebarCollapsed', next ? '1' : '0');
      return next;
    });
  }

  protected toggleDarkMode(): void {
    this.darkMode.update((prev) => {
      const next = !prev;
      this.writeStorage('darkMode', next ? '1' : '0');
      return next;
    });
  }

  protected openMobile(): void {
    this.mobileOpen.set(true);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  protected toggleProfileMenu(): void {
    this.profileMenuOpen.update((prev) => !prev);
  }

  protected closeProfileMenu(): void {
    this.profileMenuOpen.set(false);
  }

  protected openSearch(): void {
    this.searchOpen.set(true);
  }

  protected onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.searchOpen.set(true);
  }

  protected selectSearchItem(route: string): void {
    this.searchOpen.set(false);
    this.searchQuery.set('');
    void this.router.navigate([route]);
  }

  protected onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const first = this.searchResults()[0];
      if (first) {
        event.preventDefault();
        this.selectSearchItem(first.route);
      }
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.profileMenuOpen()) {
      const container = this.profileMenuRef()?.nativeElement;
      if (container && !container.contains(target)) {
        this.profileMenuOpen.set(false);
      }
    }
    if (this.searchOpen()) {
      const searchEl = this.searchMenuRef()?.nativeElement;
      if (searchEl && !searchEl.contains(target)) {
        this.searchOpen.set(false);
      }
    }
  }

  protected onEscape(): void {
    if (this.searchOpen()) {
      this.searchOpen.set(false);
    }
    if (this.profileMenuOpen()) {
      this.profileMenuOpen.set(false);
    }
    if (this.mobileOpen()) {
      this.closeMobile();
    }
  }

  protected refreshView(): void {
    this.data.loadAll();
    this.flash.info('Dashboard data refreshed.');
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigate(['/admin/login']);
  }

  private readStorage(key: string): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  }

  private writeStorage(key: string, value: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  }
}
