import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './photo.component.html',
})
export class PhotoComponent {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly photoClass = input<string>('');
  readonly priority = input<boolean>(false);
}
