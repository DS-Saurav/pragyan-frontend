import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideArrowUpRight } from '@lucide/angular';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-action-link',
  standalone: true,
  imports: [RouterLink, HlmButton, LucideArrowRight, LucideArrowUpRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-link.component.html',
})
export class ActionLinkComponent {
  readonly to = input.required<string>();
  readonly variant = input<'primary' | 'outline' | 'gold' | 'light-outline'>('primary');
  readonly icon = input<'right' | 'diagonal' | 'none'>('right');
}
