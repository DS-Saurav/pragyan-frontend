import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideBuilding2,
  LucideChevronLeft,
  LucideLogOut,
  LucideMenu,
  LucideMoon,
  LucideRefreshCw,
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
    LucideBuilding2,
    LucideChevronLeft,
    LucideX,
    LucideUser,
    LucideMoon,
    LucideSun,
    LucideLogOut,
    LucideMenu,
    LucideRefreshCw,
  ],
  templateUrl: './admin-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class AdminLayoutComponent {
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  protected readonly auth = inject(AdminAuthService);
  protected readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  protected readonly collapsed = signal(this.readStorage('sidebarCollapsed') === '1');
  protected readonly darkMode = signal(this.readStorage('darkMode') === '1');
  protected readonly mobileOpen = signal(false);

  protected readonly settings = this.data.settings;
  protected readonly user = this.auth.currentUser;
  protected readonly badges = this.data.sidebarBadges;
  protected readonly menuSections = this.data.menuSections;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly schoolName = computed(() => this.settings().schoolName);
  protected readonly academicYear = computed(() => this.settings().academicYear);

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
        const path = event.urlAfterRedirects.split('?')[0];
        const allItems = this.menuSections.flatMap((s) => s.items);
        const matched = allItems.find((item) => path === item.route || path.startsWith(item.route + '/'));
        const pageTitle = matched?.label ?? 'Admin Control Panel';
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

  protected onEscape(): void {
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
