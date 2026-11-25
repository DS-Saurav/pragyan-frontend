import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AdmissionBandComponent } from '../../shared/components/admission-band/admission-band.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    PageIntroComponent,
    EyebrowComponent,
    AdmissionBandComponent,
    LucideArrowRight,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly school = this.content.school;
  protected readonly introImage = computed(() => {
    const first = this.content.levels()[0];
    return { src: first.image, alt: first.alt };
  });
}
