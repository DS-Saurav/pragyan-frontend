import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactPanelComponent } from '../../shared/components/contact-panel/contact-panel.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageIntroComponent, ContactPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
