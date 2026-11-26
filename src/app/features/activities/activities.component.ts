import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideAward,
  LucideCheckCircle2,
  LucideCompass,
  LucideHeartHandshake,
  LucidePalette,
  LucideShieldCheck,
  LucideSparkles,
  LucideUsers,
  LucideX,
} from '@lucide/angular';
import { SchoolContentService } from '../../core/services/school-content.service';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';

interface StudentLifePhoto {
  src: string;
  alt: string;
  caption: string;
  spanClass: string;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    RouterLink,
    NgComponentOutlet,
    EyebrowComponent,
    LucideArrowRight,
    LucideAward,
    LucideCheckCircle2,
    LucideCompass,
    LucideHeartHandshake,
    LucidePalette,
    LucideShieldCheck,
    LucideSparkles,
    LucideUsers,
    LucideX,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeLightbox()',
  },
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly activities = this.content.activities;
  protected readonly activePhoto = signal<StudentLifePhoto | null>(null);

  protected readonly galleryPhotos: StudentLifePhoto[] = [
    {
      src: '/assets/images/sports.webp',
      alt: 'Children playing and running together outdoors',
      caption: 'Sports & Active Play',
      spanClass: 'md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-[410px]',
    },
    {
      src: '/assets/images/art.webp',
      alt: 'Student painting with bright colors',
      caption: 'Creative Arts & Expression',
      spanClass: 'min-h-[195px]',
    },
    {
      src: '/assets/images/learning-together.webp',
      alt: 'Students collaborating on a hands-on project',
      caption: 'Working Together',
      spanClass: 'min-h-[195px]',
    },
    {
      src: '/assets/images/early-learning.webp',
      alt: 'Teacher guiding young learners with wooden blocks',
      caption: 'Caring Guidance',
      spanClass: 'min-h-[195px]',
    },
    {
      src: '/assets/images/outdoor.webp',
      alt: 'Students exploring nature outdoors',
      caption: 'Outdoor Discovery',
      spanClass: 'min-h-[195px]',
    },
  ];

  protected altFor(src: string): string {
    return this.content.photos().find((p) => p.src === src)?.alt ?? '';
  }

  protected openLightbox(photo: StudentLifePhoto): void {
    this.activePhoto.set(photo);
  }

  protected closeLightbox(): void {
    this.activePhoto.set(null);
  }
}
