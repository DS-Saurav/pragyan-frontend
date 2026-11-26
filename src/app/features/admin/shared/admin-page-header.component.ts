import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  standalone: true,
  templateUrl: './admin-page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
}
