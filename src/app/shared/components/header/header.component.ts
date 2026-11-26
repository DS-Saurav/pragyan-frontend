import { isPlatformBrowser, NgComponentOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideChevronDown, LucideGraduationCap, LucideLogIn, LucideMenu, LucideX } from '@lucide/angular';
import gsap from 'gsap';
import { filter, map, startWith } from 'rxjs';
import { SchoolContentService } from '../../../core/services/school-content.service';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    BrandComponent,
    ActionLinkComponent,
    LucideChevronDown,
    LucideGraduationCap,
    LucideLogIn,
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
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private gsapCtx: gsap.Context | null = null;

  protected readonly navigation = this.content.navigation;
  protected readonly menuOpen = signal(false);
  protected readonly expandedMobileItem = signal<string | null>(null);
  protected readonly isScrolled = signal(false);
  protected readonly scrollProgress = signal(0);
  protected readonly showAdminLogin = signal(false);

  private logoClickCount = 0;
  private lastLogoClickAt = 0;
  private logoClickTimer: ReturnType<typeof setTimeout> | null = null;
  private adminHideTimer: ReturnType<typeof setTimeout> | null = null;
  private lastScrollY = 0;
  private headerHidden = false;

  private readonly topBarRef = viewChild<ElementRef<HTMLElement>>('topBar');
  private readonly toggleBtnRef = viewChild<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly headerRef = viewChild<ElementRef<HTMLElement>>('siteHeader');
  private readonly desktopNavRef = viewChild<ElementRef<HTMLElement>>('desktopNav');
  private readonly navPillRef = viewChild<ElementRef<HTMLElement>>('navPill');

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

  protected hasRichChildren(children?: { description?: string }[]): boolean {
    return Boolean(children?.some((c) => Boolean(c.description)));
  }

  protected toggleMobileAccordion(key: string): void {
    this.expandedMobileItem.update((prev) => (prev === key ? null : key));
  }

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.menuOpen.set(false);
        this.expandedMobileItem.set(null);
      });

    effect(() => {
      const marker = this.topBarRef()?.nativeElement;
      if (!marker || typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(([entry]) => {
        this.isScrolled.set(!entry.isIntersecting);
      });
      observer.observe(marker);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });

    afterNextRender(() => {
      this.initHeaderAnimation();
      this.initScrollBehavior();
    });

    this.destroyRef.onDestroy(() => {
      this.gsapCtx?.revert();
      if (this.logoClickTimer) clearTimeout(this.logoClickTimer);
      if (this.adminHideTimer) clearTimeout(this.adminHideTimer);
    });
  }

  private initHeaderAnimation(): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const root = this.hostRef.nativeElement as HTMLElement;
    this.gsapCtx = gsap.context(() => {
      const targets = root.querySelectorAll('[data-header-brand], [data-header-nav], [data-header-cta]');
      if (!targets.length) return;
      gsap.from(targets, {
        y: -12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.045,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, root);
  }

  private initScrollBehavior(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress.set(docHeight > 0 ? Math.min(100, Math.max(0, (currentY / docHeight) * 100)) : 0);

      const headerEl = this.headerRef()?.nativeElement;
      if (!headerEl || reducedMotion || this.menuOpen()) {
        this.lastScrollY = currentY;
        return;
      }

      const delta = currentY - this.lastScrollY;
      if (currentY > 140 && delta > 6 && !this.headerHidden) {
        this.headerHidden = true;
        gsap.to(headerEl, { yPercent: -100, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
      } else if ((delta < -6 || currentY <= 80) && this.headerHidden) {
        this.headerHidden = false;
        gsap.to(headerEl, { yPercent: 0, duration: 0.32, ease: 'power3.out', overwrite: 'auto' });
      }
      this.lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }

  protected onNavHover(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.currentTarget as HTMLElement | null;
    const navEl = this.desktopNavRef()?.nativeElement;
    const pillEl = this.navPillRef()?.nativeElement;
    if (!target || !navEl || !pillEl) return;

    const navRect = navEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = targetRect.left - navRect.left;
    const width = targetRect.width;

    gsap.to(pillEl, {
      x,
      width,
      opacity: 1,
      duration: 0.26,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const dropdownItems = target.querySelectorAll('[data-dropdown-item]');
      if (dropdownItems.length) {
        gsap.fromTo(
          dropdownItems,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.24,
            stagger: 0.035,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            overwrite: 'auto',
          },
        );
      }
    }
  }

  protected onNavLeave(): void {
    const pillEl = this.navPillRef()?.nativeElement;
    if (!pillEl) return;
    gsap.to(pillEl, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }

  protected onLogoClick(): void {
    if (this.showAdminLogin()) return;

    const now = Date.now();
    this.logoClickCount = now - this.lastLogoClickAt <= 400 ? this.logoClickCount + 1 : 1;
    this.lastLogoClickAt = now;
    if (this.logoClickTimer) clearTimeout(this.logoClickTimer);

    if (this.logoClickCount >= 12) {
      this.showAdminLogin.set(true);
      this.logoClickCount = 0;
      this.lastLogoClickAt = 0;
      this.logoClickTimer = null;
      if (this.adminHideTimer) clearTimeout(this.adminHideTimer);
      this.adminHideTimer = setTimeout(() => {
        this.showAdminLogin.set(false);
        this.adminHideTimer = null;
      }, 30_000);
      return;
    }

    this.logoClickTimer = setTimeout(() => {
      this.logoClickCount = 0;
      this.lastLogoClickAt = 0;
      this.logoClickTimer = null;
    }, 400);
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
