import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight } from '@lucide/angular';
import type { SchoolUpdate } from '../../../core/models/school.models';
import { SchoolContentService } from '../../../core/services/school-content.service';
import { UpdateMetaComponent } from '../update-meta/update-meta.component';

@Component({
  selector: 'app-notice-list',
  standalone: true,
  imports: [RouterLink, LucideArrowUpRight, UpdateMetaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notice-list.component.html',
})
export class NoticeListComponent {
  protected readonly content = inject(SchoolContentService);
  readonly items = input.required<SchoolUpdate[]>();
}
