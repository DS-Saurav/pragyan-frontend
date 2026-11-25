import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowUpRight, LucideChevronDown, LucideMail, LucideMapPin, LucideMenu, LucidePhone, LucideX } from '@lucide/angular';
import { filter, map, startWith } from 'rxjs';
import { SchoolContentService } from '../../../core/services/school-content.service';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BrandComponent,
    ActionLinkComponent,
    LucideMapPin,
    LucidePhone,
    LucideMail,
    LucideArrowUpRight,
    LucideChevronDown,
    LucideMenu,
    LucideX,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly content = inject(SchoolContentService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly school = this.content.school;
  protected readonly navigation = this.content.navigation;
  protected readonly menuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  private readonly topBarRef = viewChild<ElementRef<HTMLElement>>('topBar');
  private readonly toggleBtnRef = viewChild<ElementRef<HTMLButtonElement>>('toggleBtn');

  protected readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('?')[0].split('#')[0]),
      startWith(this.router.url.split('?')[0].split('#')[0]),
    ),
    { initialValue: '/' },
  );

  protected readonly isUpdatesPage = () => /^\/(?:events|notices)(?:\/|$)/.test(this.currentPath());

  protected isChildActive(children?: { to: string }[]): boolean {
    if (!children?.length) return false;
    const path = this.currentPath();
    return children.some((child) => path === child.to || path.startsWith(`${child.to}/`));
  }

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));

    effect(() => {
      const marker = this.topBarRef()?.nativeElement;
      if (!marker || typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(([entry]) => {
        this.isScrolled.set(!entry.isIntersecting);
      });
      observer.observe(marker);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected onEscape(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.toggleBtnRef()?.nativeElement.focus();
  }
}
