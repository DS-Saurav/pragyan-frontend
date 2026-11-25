import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'app-page-intro',
  standalone: true,
  imports: [RouterLink, LucideChevronRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-intro.component.html',
})
export class PageIntroComponent {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly image = input<{ src: string; alt: string } | undefined>(undefined);
}
