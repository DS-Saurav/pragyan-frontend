import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionLinkComponent } from '../../shared/components/action-link/action-link.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PageIntroComponent, ActionLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
