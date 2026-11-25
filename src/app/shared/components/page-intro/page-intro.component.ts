import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronRight } from '@lucide/angular';
import { EyebrowComponent } from '../eyebrow/eyebrow.component';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-page-intro',
  standalone: true,
  imports: [RouterLink, LucideChevronRight, EyebrowComponent, PhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-intro.component.html',
})
export class PageIntroComponent {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly image = input<{ src: string; alt: string } | undefined>(undefined);
}
