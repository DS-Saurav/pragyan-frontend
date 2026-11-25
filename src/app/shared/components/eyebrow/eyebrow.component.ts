import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-eyebrow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './eyebrow.component.html',
})
export class EyebrowComponent {}
