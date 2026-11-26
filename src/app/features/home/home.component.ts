import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCalendarDays,
  LucideCheckCircle2,
  LucideChevronLeft,
  LucideChevronRight,
  LucideMapPin,
  LucideSparkles,
} from '@lucide/angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AchievementShowcaseComponent } from '../../shared/components/achievement-showcase/achievement-showcase.component';
import { ActionLinkComponent } from '../../shared/components/action-link/action-link.component';
import { ContactPanelComponent } from '../../shared/components/contact-panel/contact-panel.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { NoticeListComponent } from '../../shared/components/notice-list/notice-list.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PhotoComponent,
    AchievementShowcaseComponent,
    ActionLinkComponent,
    EyebrowComponent,
    NoticeListComponent,
    ContactPanelComponent,
    LucideSparkles,
    LucideMapPin,
    LucideArrowRight,
    LucideCheckCircle2,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCalendarDays,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly content = inject(SchoolContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private gsapCtx: gsap.Context | null = null;

  protected readonly school = this.content.school;
  protected readonly academicStages = [
    {
      id: 'early-childhood',
      step: '01',
      title: 'Early Childhood Education',
      grades: 'Nursery – UKG',
      shortDescription:
        'A warm, play-based start where young learners build communication, curiosity, creativity, and social confidence.',
    },
    {
      id: 'primary',
      step: '02',
      title: 'Primary Level',
      grades: 'Grades 1–5',
      shortDescription:
        'Strong foundations in literacy, numeracy, core subjects, classroom discussions, and positive learning habits.',
    },
    {
      id: 'lower-secondary',
      step: '03',
      title: 'Lower Secondary Level',
      grades: 'Grades 6–8',
      shortDescription:
        'Deeper subject understanding, critical thinking, project-based collaboration, and personal responsibility.',
    },
    {
      id: 'secondary',
      step: '04',
      title: 'Secondary Level',
      grades: 'Grades 9–10',
      shortDescription:
        'Structured subject learning, regular assessments, and focused guidance for Secondary Education Examination (SEE) readiness.',
    },
  ];
  protected readonly photos = this.content.photos;

  protected readonly heroSlides = computed(() => this.content.dynamicHeroSlides());
  protected readonly activeHero = signal(0);
  private heroPointerStartX: number | null = null;
  private heroPaused = false;

  constructor() {
    this.content.loadHomepage();
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const timer = window.setInterval(() => {
        if (this.heroSlides().length > 1 && !this.heroPaused) {
          this.setHeroSlide(this.activeHero() + 1);
        }
      }, 7500);
      this.destroyRef.onDestroy(() => window.clearInterval(timer));
    }

    afterNextRender(() => {
      this.initAnimations();
    });

    this.destroyRef.onDestroy(() => {
      this.gsapCtx?.revert();
    });
  }

  private initAnimations(): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const root = this.hostRef.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      const heroItems = root.querySelectorAll('[data-hero-stagger]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          y: 22,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      root.querySelectorAll('[data-gsap-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 18,
          opacity: 0,
          duration: 0.42,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        });
      });

      root.querySelectorAll('[data-gsap-media]').forEach((el) => {
        gsap.from(el, {
          scale: 0.97,
          y: 14,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        });
      });

      root.querySelectorAll('[data-gsap-stagger-group]').forEach((group) => {
        const cards = group.querySelectorAll('[data-gsap-card]');
        if (!cards.length) return;
        gsap.from(cards, {
          y: 18,
          opacity: 0,
          duration: 0.38,
          stagger: 0.045,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: group,
            start: 'top 92%',
            once: true,
          },
        });
      });
    }, root);
  }

  protected setHeroSlide(index: number): void {
    const total = this.heroSlides().length;
    if (total === 0) return;
    this.activeHero.set((index + total) % total);
  }

  protected onHeroPointerDown(event: PointerEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a, button')) return;
    this.heroPointerStartX = event.clientX;
    this.heroPaused = true;
  }

  protected onHeroPointerUp(event: PointerEvent): void {
    this.heroPaused = false;
    if (this.heroPointerStartX === null) return;
    const dx = event.clientX - this.heroPointerStartX;
    this.heroPointerStartX = null;
    if (Math.abs(dx) > 40) {
      this.setHeroSlide(this.activeHero() + (dx < 0 ? 1 : -1));
    }
  }

  protected onHeroPointerCancel(): void {
    this.heroPointerStartX = null;
    this.heroPaused = false;
  }

  protected setHeroPaused(paused: boolean): void {
    this.heroPaused = paused;
  }

  protected readonly topNotices = computed(() => this.content.noticeUpdates().slice(0, 4));
  protected readonly upcomingEvents = computed(() =>
    this.content.eventUpdates().filter((item) => !item.sample).slice(0, 3),
  );
  protected readonly realAchievements = computed(() =>
    this.content.newsUpdates().filter((item) => !item.sample && item.category.toLowerCase().includes('achiev')),
  );

  protected readonly beyondClassroom = [
    {
      title: 'Sports and Games',
      description: 'Staying healthy, active, and learning teamwork and fair play.',
      image: '/assets/images/sports.webp',
      alt: 'Students playing outdoor sports together',
    },
    {
      title: 'Arts and Creativity',
      description: 'Expressing ideas through drawing, painting, music, and creative work.',
      image: '/assets/images/art.webp',
      alt: 'Student painting with bright colors',
    },
    {
      title: 'Practical Learning',
      description: 'Connecting classroom lessons with hands-on projects and real discovery.',
      image: '/assets/images/outdoor.webp',
      alt: 'Students observing nature outdoors',
    },
    {
      title: 'Extracurricular Activities',
      description: 'Exploring new interests, building confidence, and working together.',
      image: '/assets/images/learning-together.webp',
      alt: 'Students collaborating on a group activity',
    },
  ];

  protected readonly whyChoosePoints = [
    'Supportive Learning Environment',
    'Student-Centered Learning',
    'Personal Growth and Development',
    'Practical and Creative Learning',
    'Positive Values and Discipline',
    'Supportive Teachers and School Community',
  ];

  protected readonly lifePhotos = [
    {
      src: '/assets/images/classroom.webp',
      alt: 'Students learning together in a classroom',
      caption: 'Classroom Collaboration',
      spanClass: 'md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[380px]',
    },
    {
      src: '/assets/images/art.webp',
      alt: 'Creative arts activity',
      caption: 'Creative Expression',
      spanClass: 'min-h-[180px]',
    },
    {
      src: '/assets/images/sports.webp',
      alt: 'Students playing outdoors',
      caption: 'Sports & Play',
      spanClass: 'min-h-[180px]',
    },
    {
      src: '/assets/images/early-learning.webp',
      alt: 'Teacher guiding young learners',
      caption: 'Caring Guidance',
      spanClass: 'min-h-[180px]',
    },
    {
      src: '/assets/images/outdoor.webp',
      alt: 'Outdoor discovery',
      caption: 'Outdoor Discovery',
      spanClass: 'min-h-[180px]',
    },
  ];
}
