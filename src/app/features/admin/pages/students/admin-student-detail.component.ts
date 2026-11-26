import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  LucideAlertTriangle,
  LucideArrowLeft,
  LucideBookOpen,
  LucideHeartPulse,
  LucideTrash2,
  LucideUser,
} from '@lucide/angular';
import type { AdminStudent, StudentHouse, StudentStatus } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';

@Component({
  selector: 'app-admin-student-detail',
  standalone: true,
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideUser,
    LucideBookOpen,
    LucideHeartPulse,
    LucideAlertTriangle,
    LucideTrash2,
  ],
  templateUrl: './admin-student-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminStudentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  private readonly studentId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly fetchedStudent = signal<AdminStudent | null>(null);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly student = computed<AdminStudent | null>(() => {
    const fromStore = this.data.students().find((s) => s.id === this.studentId);
    return fromStore ?? this.fetchedStudent();
  });

  protected readonly initials = computed(() => {
    const s = this.student();
    if (!s) return '?';
    return `${s.firstName.charAt(0)}${s.lastName.charAt(0)}`.toUpperCase();
  });

  constructor() {
    if (!Number.isFinite(this.studentId) || this.studentId <= 0) {
      this.error.set('Invalid student ID.');
      return;
    }

    this.loading.set(!this.student());
    this.data.getStudent(this.studentId).subscribe({
      next: (res) => {
        this.fetchedStudent.set(res.student);
        this.loading.set(false);
      },
      error: () => {
        if (!this.student()) {
          this.error.set('Student record could not be loaded.');
        }
        this.loading.set(false);
      },
    });
  }

  protected changeStatus(event: Event): void {
    const s = this.student();
    if (!s) return;
    const status = (event.target as HTMLSelectElement).value as StudentStatus;
    this.data.updateStudentStatus(s.id, status).subscribe({
      next: (res) => {
        this.fetchedStudent.set(res.student);
        this.flash.success('Student status updated.');
      },
      error: () => this.flash.error('Failed to update student status.'),
    });
  }

  protected deleteStudent(): void {
    const s = this.student();
    if (!s) return;
    const fullName = `${s.firstName} ${s.lastName}`;
    if (!confirm(`Delete ${fullName}? This cannot be undone.`)) return;

    this.data.deleteStudent(s.id).subscribe({
      next: () => {
        this.flash.success(`${fullName} deleted.`);
        void this.router.navigate(['/admin/students']);
      },
      error: () => this.flash.error(`Failed to delete ${fullName}.`),
    });
  }

  protected houseClass(house: StudentHouse): string {
    switch (house) {
      case 'Red':
        return 'bg-rose-600 text-white';
      case 'Blue':
        return 'bg-blue-600 text-white';
      case 'Green':
        return 'bg-emerald-600 text-white';
      case 'Yellow':
        return 'bg-amber-500 text-white';
    }
  }

  protected statusClass(status: StudentStatus): string {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'transferred':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'passed_out':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }
}
