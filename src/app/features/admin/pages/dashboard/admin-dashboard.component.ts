import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideActivity,
  LucideCalendar,
  LucideGraduationCap,
  LucideMegaphone,
  LucideSettings,
  LucideShieldCheck,
  LucideUserCheck,
  LucideUserCircle,
  LucideWallet,
  LucideZap,
} from '@lucide/angular';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminEmptyStateComponent } from '../../shared/admin-empty-state.component';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';
import { AdminStatCardComponent } from '../../shared/admin-stat-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    AdminPageHeaderComponent,
    AdminStatCardComponent,
    AdminEmptyStateComponent,
    LucideCalendar,
    LucideActivity,
    LucideMegaphone,
    LucideZap,
    LucideGraduationCap,
    LucideUserCheck,
    LucideWallet,
    LucideShieldCheck,
    LucideSettings,
    LucideUserCircle,
  ],
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  private readonly data = inject(AdminDataService);

  protected readonly today = new Date();
  protected readonly megaphoneIcon = LucideMegaphone;
  protected readonly academicYear = computed(() => this.data.settings().academicYear);
  protected readonly stats = this.data.dashboardStats;
  protected readonly latestNotices = computed(() =>
    this.data.notices().filter((n) => n.publicationState !== 'archived').slice(0, 4),
  );
}
