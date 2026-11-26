import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { BadgeTone } from '../models/admin.models';

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: 'ui-badge-neutral',
  success: 'ui-badge-success',
  warning: 'ui-badge-warning',
  danger: 'ui-badge-danger',
  info: 'ui-badge-info',
  brand: 'ui-badge-brand',
};

@Component({
  selector: 'app-admin-badge',
  standalone: true,
  templateUrl: './admin-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBadgeComponent {
  readonly tone = input<BadgeTone>('neutral');
  protected readonly badgeClass = computed(() => `ui-badge ${BADGE_TONES[this.tone()]}`);
}
