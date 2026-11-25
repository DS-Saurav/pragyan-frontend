import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideArrowUpRight, LucideMapPin } from '@lucide/angular';
import { SchoolContentService } from '../../../core/services/school-content.service';
import { EyebrowComponent } from '../eyebrow/eyebrow.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-contact-panel',
  standalone: true,
  imports: [EyebrowComponent, InquiryFormComponent, LucideMapPin, LucideArrowUpRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-panel.component.html',
})
export class ContactPanelComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly school = this.content.school;
  protected readonly mapsUrl = this.content.mapsUrl;
}
