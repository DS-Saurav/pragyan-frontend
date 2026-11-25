import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { SchoolUpdate } from '../../../core/models/school.models';

@Component({
  selector: 'app-update-meta',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './update-meta.component.html',
})
export class UpdateMetaComponent {
  readonly item = input.required<SchoolUpdate>();

  protected readonly metaLabel = computed(() => {
    const current = this.item();
    const prefix = current.sample ? 'Sample · ' : '';
    const dateText = current.date
      ? [current.date.gregorian, current.date.bikramSambat].filter(Boolean).join(' / ')
      : 'No date published';
    return `${prefix}${dateText}`;
  });
}
