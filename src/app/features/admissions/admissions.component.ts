import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AdmissionStepsComponent } from '../../shared/components/admission-steps/admission-steps.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { InquiryFormComponent } from '../../shared/components/inquiry-form/inquiry-form.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [
    RouterLink,
    PageIntroComponent,
    EyebrowComponent,
    AdmissionStepsComponent,
    InquiryFormComponent,
    LucideArrowRight,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admissions.component.html',
})
export class AdmissionsComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly introTitle = computed(() => `Admissions at ${this.content.school().name}`);
}
