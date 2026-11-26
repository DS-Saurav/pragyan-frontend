import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideNewspaper, LucidePencil, LucidePlus, LucideShieldCheck } from '@lucide/angular';
import type { BadgeTone, PublicationState } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';
import { AdminBadgeComponent } from '../../shared/admin-badge.component';
import { AdminEmptyStateComponent } from '../../shared/admin-empty-state.component';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

@Component({
  selector: 'app-admin-news',
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
  templateUrl: './admin-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNewsComponent {
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  protected readonly stories = this.data.newsStories;
  protected readonly newspaperIcon = LucideNewspaper;

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

  protected feature(id: number): void {
    this.data.setFeaturedNews(id);
    this.flash.success('Homepage featured story updated.');
  }

  protected unfeature(): void {
    this.data.setFeaturedNews(null);
    this.flash.info('Homepage feature removed.');
  }
}
