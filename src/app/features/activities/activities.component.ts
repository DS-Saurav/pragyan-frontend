import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AdmissionBandComponent } from '../../shared/components/admission-band/admission-band.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    NgComponentOutlet,
    PageIntroComponent,
    EyebrowComponent,
    PhotoComponent,
    AdmissionBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly activities = this.content.activities;
  protected readonly introImage = computed(() => ({
    src: '/assets/images/sports.webp',
    alt: this.content.photos()[2].alt,
  }));

  protected altFor(src: string): string {
    return this.content.photos().find((p) => p.src === src)?.alt ?? '';
  }
}
