import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AdmissionBandComponent } from '../../shared/components/admission-band/admission-band.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [
    NgComponentOutlet,
    PageIntroComponent,
    EyebrowComponent,
    PhotoComponent,
    AdmissionBandComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './academics.component.html',
})
export class AcademicsComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly levels = this.content.levels;
  protected readonly pillars = this.content.pillars;
  protected readonly introImage = computed(() => {
    const second = this.levels()[1];
    return { src: second.image, alt: second.alt };
  });
}
