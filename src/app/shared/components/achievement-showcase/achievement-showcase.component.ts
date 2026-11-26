import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  LucideAward,
  LucideCalendar,
  LucideChevronLeft,
  LucideChevronRight,
  LucideExpand,
  LucideGraduationCap,
  LucideUser,
  LucideX,
} from '@lucide/angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ACHIEVEMENT_CATEGORIES,
  type AchievementFilter,
  STUDENT_ACHIEVEMENTS,
  type StudentAchievement,
} from '../../data/achievements.data';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { EyebrowComponent } from '../eyebrow/eyebrow.component';

@Component({
  selector: 'app-achievement-showcase',
  standalone: true,
  imports: [
    EyebrowComponent,
    ActionLinkComponent,
    LucideAward,
    LucideCalendar,
    LucideChevronLeft,
    LucideChevronRight,
    LucideExpand,
    LucideGraduationCap,
    LucideUser,
    LucideX,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './achievement-showcase.component.html',
})
export class AchievementShowcaseComponent {
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private gsapCtx: gsap.Context | null = null;

  readonly limit = input<number | null>(null);
  readonly showViewAll = input<boolean>(true);
  readonly compactIntro = input<boolean>(false);

  protected readonly categories = ACHIEVEMENT_CATEGORIES;
  protected readonly activeCategory = signal<AchievementFilter>('All Achievements');
  protected readonly selectedAchievement = signal<StudentAchievement | null>(null);

  protected readonly filteredAchievements = computed(() => {
    const category = this.activeCategory();
    const list =
      category === 'All Achievements'
        ? STUDENT_ACHIEVEMENTS
        : STUDENT_ACHIEVEMENTS.filter((item) => item.category === category);
    const max = this.limit();
    return max !== null ? list.slice(0, max) : list;
  });

  protected readonly featuredAchievement = computed(() => {
    const list = this.filteredAchievements();
    return list.find((item) => item.featured) ?? list[0] ?? null;
  });

  protected readonly galleryAchievements = computed(() => {
    const featured = this.featuredAchievement();
    const list = this.filteredAchievements();
    return featured ? list.filter((item) => item.id !== featured.id) : list;
  });

  protected readonly selectedIndex = computed(() => {
    const current = this.selectedAchievement();
    if (!current) return -1;
    return this.filteredAchievements().findIndex((item) => item.id === current.id);
  });

  constructor() {
    afterNextRender(() => {
      this.initEntranceAnimation();
    });

    this.destroyRef.onDestroy(() => {
      this.gsapCtx?.revert();
    });
  }

  protected selectCategory(category: AchievementFilter): void {
    if (this.activeCategory() === category) return;
    this.activeCategory.set(category);
    this.animateFilteredItems();
  }

  protected openModal(item: StudentAchievement): void {
    this.selectedAchievement.set(item);
  }

  protected closeModal(): void {
    this.selectedAchievement.set(null);
  }

  protected stepModal(delta: number): void {
    const list = this.filteredAchievements();
    const idx = this.selectedIndex();
    if (list.length <= 1 || idx === -1) return;
    const nextIdx = (idx + delta + list.length) % list.length;
    this.selectedAchievement.set(list[nextIdx]);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.selectedAchievement()) {
      this.closeModal();
    }
  }

  private prefersReducedMotion(): boolean {
    return (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private initEntranceAnimation(): void {
    if (this.prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const root = this.hostRef.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      const header = root.querySelector('[data-ach-header]');
      if (header) {
        gsap.from(header, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: header,
            start: 'top 86%',
            once: true,
          },
        });
      }

      const featured = root.querySelector('[data-ach-featured]');
      if (featured) {
        gsap.from(featured, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: featured,
            start: 'top 86%',
            once: true,
          },
        });
      }

      const cards = root.querySelectorAll('[data-ach-card]');
      if (cards.length) {
        gsap.from(cards, {
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 88%',
            once: true,
          },
        });
      }
    }, root);
  }

  private animateFilteredItems(): void {
    if (this.prefersReducedMotion()) return;
    const root = this.hostRef.nativeElement as HTMLElement;

    requestAnimationFrame(() => {
      const items = root.querySelectorAll('[data-ach-featured], [data-ach-card]');
      if (!items.length) return;
      gsap.fromTo(
        items,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      );
    });
  }
}
