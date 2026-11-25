import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideArrowUpRight,
  LucideBell,
  LucideCalendarDays,
  LucideChevronLeft,
  LucideChevronRight,
  LucideHeartHandshake,
  LucideImages,
  LucideMapPin,
  LucideQuote,
  LucideSparkles,
  LucideTrophy,
  LucideUsersRound,
} from '@lucide/angular';
import { SchoolContentService } from '../../core/services/school-content.service';
import { ActionLinkComponent } from '../../shared/components/action-link/action-link.component';
import { AdmissionStepsComponent } from '../../shared/components/admission-steps/admission-steps.component';
import { ContactPanelComponent } from '../../shared/components/contact-panel/contact-panel.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { NoticeListComponent } from '../../shared/components/notice-list/notice-list.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { UpdateMetaComponent } from '../../shared/components/update-meta/update-meta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgComponentOutlet,
    PhotoComponent,
    ActionLinkComponent,
    EyebrowComponent,
    NoticeListComponent,
    UpdateMetaComponent,
    AdmissionStepsComponent,
    ContactPanelComponent,
    LucideSparkles,
    LucideMapPin,
    LucideArrowUpRight,
    LucideArrowRight,
    LucideBell,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCalendarDays,
    LucideHeartHandshake,
    LucideTrophy,
    LucideUsersRound,
    LucideQuote,
    LucideImages,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly content = inject(SchoolContentService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly school = this.content.school;
  protected readonly levels = this.content.levels;
  protected readonly quickLinks = this.content.quickLinks;
  protected readonly photos = this.content.photos;

  protected readonly heroSlides = computed(() => [
    {
      src: '/assets/images/learning-together.webp',
      alt: 'Illustration of children working together on a handmade model in a Nepalese classroom',
    },
    ...this.photos().map((photo) => ({
      src: photo.src,
      alt: photo.alt,
    })),
  ]);
  protected readonly activeHero = signal(0);
  private heroPointerStartX: number | null = null;
  private heroPaused = false;

  protected readonly activeMoment = signal(0);
  private readonly momentsTrackRef = viewChild<ElementRef<HTMLDivElement>>('momentsTrack');

  constructor() {
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const timer = window.setInterval(() => {
        if (!this.heroPaused) {
          this.setHeroSlide(this.activeHero() + 1);
        }
      }, 5500);
      this.destroyRef.onDestroy(() => window.clearInterval(timer));
    }
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

  protected readonly activePhoto = computed(() => this.photos()[this.activeMoment()]);

  protected readonly topNotices = computed(() => this.content.noticeUpdates().slice(0, 3));
  protected readonly featuredNews = computed(() => this.content.newsUpdates()[0]);
  protected readonly secondaryNews = computed(() => this.content.newsUpdates().slice(1, 3));
  protected readonly featuredEvent = computed(() => this.content.eventUpdates()[0]);
  protected readonly hasConfirmedEvents = computed(() =>
    this.content.eventUpdates().some((item) => !item.sample),
  );

  protected readonly schoolLife = computed(() => {
    const allPhotos = this.photos();
    const allActivities = this.content.activities();
    return [
      {
        ...allPhotos[0],
        title: 'Classroom learning',
        description: 'Making sense of new ideas together.',
      },
      {
        ...allPhotos[1],
        title: allActivities[1].title,
        description: allActivities[1].description,
      },
      {
        ...allPhotos[2],
        title: allActivities[0].title,
        description: allActivities[0].description,
      },
      {
        ...allPhotos[4],
        title: allActivities[2].title,
        description: allActivities[2].description,
      },
    ];
  });

  protected readonly communityPhotos = computed(() => {
    const all = this.photos();
    return [all[1], all[2], all[4]];
  });

  protected formatSlideIndex(num: number): string {
    return String(num).padStart(2, '0');
  }

  protected jumpToSlide(index: number): void {
    const track = this.momentsTrackRef()?.nativeElement;
    const total = this.photos().length;
    if (!track || total === 0) return;

    const next = (index + total) % total;
    const slide = track.children[next] as HTMLElement | undefined;
    if (!slide) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  protected onTrackScroll(event: Event): void {
    const el = event.currentTarget as HTMLElement;
    const total = this.photos().length;
    if (!el.clientWidth || total === 0) return;
    const next = Math.max(0, Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)));
    this.activeMoment.set(next);
  }

  protected onTrackKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    this.jumpToSlide(this.activeMoment() + (event.key === 'ArrowRight' ? 1 : -1));
  }
}
