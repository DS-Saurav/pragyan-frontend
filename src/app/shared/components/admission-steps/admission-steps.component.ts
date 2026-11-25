import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admission-steps',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admission-steps.component.html',
})
export class AdmissionStepsComponent {}
