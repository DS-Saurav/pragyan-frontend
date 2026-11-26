import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideMegaphone, LucidePencil, LucidePlus, LucideShieldCheck } from '@lucide/angular';
import type { BadgeTone, PublicationState } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminBadgeComponent } from '../../shared/admin-badge.component';
import { AdminEmptyStateComponent } from '../../shared/admin-empty-state.component';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

@Component({
  selector: 'app-admin-notices',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    AdminPageHeaderComponent,
    AdminBadgeComponent,
    AdminEmptyStateComponent,
    LucidePlus,
    LucideShieldCheck,
    LucidePencil,
  ],
  templateUrl: './admin-notices.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNoticesComponent {
  private readonly data = inject(AdminDataService);
  protected readonly notices = this.data.notices;
  protected readonly megaphoneIcon = LucideMegaphone;

  protected toneFor(state: PublicationState): BadgeTone {
    switch (state) {
      case 'published':
        return 'success';
      case 'review':
      case 'scheduled':
        return 'warning';
      case 'withdrawn':
        return 'danger';
      default:
        return 'neutral';
    }
  }
}
