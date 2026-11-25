import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionLinkComponent } from '../action-link/action-link.component';
import { EyebrowComponent } from '../eyebrow/eyebrow.component';

@Component({
  selector: 'app-admission-band',
  standalone: true,
  imports: [EyebrowComponent, ActionLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admission-band.component.html',
})
export class AdmissionBandComponent {}
