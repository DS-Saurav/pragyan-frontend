import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideX } from '@lucide/angular';
import { EyebrowComponent } from '../../../../shared/components/eyebrow/eyebrow.component';
import {
  AcademicGalleryPhoto,
  ENVIRONMENT_GALLERY,
  STUDENT_ACTIVITIES,
} from '../../academics.data';

@Component({
  selector: 'app-student-activities',
  standalone: true,
  imports: [RouterLink, NgComponentOutlet, EyebrowComponent, LucideArrowRight, LucideX],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeLightbox()',
  },
  templateUrl: './student-activities.component.html',
})
export class StudentActivitiesComponent {
  protected readonly activities = STUDENT_ACTIVITIES;
  protected readonly gallery = ENVIRONMENT_GALLERY;
  protected readonly activePhoto = signal<AcademicGalleryPhoto | null>(null);

  protected openLightbox(photo: AcademicGalleryPhoto): void {
    this.activePhoto.set(photo);
  }

  protected closeLightbox(): void {
    this.activePhoto.set(null);
  }
}
