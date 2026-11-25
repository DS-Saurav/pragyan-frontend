import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SchoolContentService } from '../../core/services/school-content.service';
import { AdmissionBandComponent } from '../../shared/components/admission-band/admission-band.component';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [NgComponentOutlet, PageIntroComponent, EyebrowComponent, AdmissionBandComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './facilities.component.html',
})
export class FacilitiesComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly facilities = this.content.facilities;
}
