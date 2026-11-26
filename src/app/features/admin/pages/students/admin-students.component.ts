import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAlertTriangle,
  LucideBarChart3,
  LucideCalendar,
  LucideCoins,
  LucideContact,
  LucidePencil,
  LucideTrash2,
  LucideUsers,
} from '@lucide/angular';
import type { AdminStudent, StudentHouse, StudentStatus } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAlertTriangle,
    LucideCoins,
    LucideCalendar,
    LucideBarChart3,
    LucideUsers,
    LucideContact,
    LucidePencil,
    LucideTrash2,
  ],
  templateUrl: './admin-students.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeAllModals()',
  },
})
export class AdminStudentsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  protected readonly classOptions = this.data.classOptions;
  protected readonly academicYears = this.data.academicYears;
  protected readonly studentsLoading = this.data.studentsLoading;
  protected readonly defaultAcademicYear = computed(() => this.data.settings().academicYear);

  // Filters
  protected readonly statusFilter = signal<'' | StudentStatus>('');
  protected readonly searchFilter = signal('');
  protected readonly classFilter = signal('');
  protected readonly genderFilter = signal('');
  protected readonly houseFilter = signal('');
  protected readonly yearFilter = signal('');
  protected readonly allergyFilter = signal(false);

  // Modals & Request State
  protected readonly addModalOpen = signal(false);
  protected readonly editModalOpen = signal(false);
  protected readonly editingStudentId = signal<number | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);
  protected readonly quickModal = signal<{ type: string; studentName: string } | null>(null);

  constructor() {
    this.data.loadStudents();
  }

  protected readonly counts = computed(() => {
    const all = this.data.students();
    return {
      all: all.length,
      active: all.filter((s) => s.status === 'active').length,
      inactive: all.filter((s) => s.status === 'inactive').length,
      transferred: all.filter((s) => s.status === 'transferred').length,
      passed_out: all.filter((s) => s.status === 'passed_out').length,
      suspended: all.filter((s) => s.status === 'suspended').length,
    };
  });

  protected readonly filteredStudents = computed(() => {
    const status = this.statusFilter();
    const search = this.searchFilter().trim().toLowerCase();
    const cls = this.classFilter();
    const gender = this.genderFilter();
    const house = this.houseFilter();
    const year = this.yearFilter();
    const allergyOnly = this.allergyFilter();

    return this.data.students().filter((s) => {
      if (status && s.status !== status) return false;
      if (cls && s.classApplied !== cls) return false;
      if (gender && s.gender !== gender) return false;
      if (house && s.house !== house) return false;
      if (year && s.academicYear !== year) return false;
      if (allergyOnly && !s.hasAllergies) return false;
      if (search) {
        const hay = `${s.admNumber} ${s.firstName} ${s.lastName} ${s.classApplied}`.toLowerCase();
        if (!hay.includes(search)) return false;
      }
      return true;
    });
  });

  protected readonly studentForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male' as 'Male' | 'Female' | 'Other', Validators.required],
    dob: ['', Validators.required],
    dobBs: [''],
    languagesSpoken: [''],
    address: [''],
    classApplied: ['Class 1', Validators.required],
    rollNo: [1],
    academicYear: ['2082-2083', Validators.required],
    status: ['active' as StudentStatus],
    house: ['Red' as StudentHouse],
    eal: ['Native'],
    admissionDate: [''],
    previousSchool: [''],
    bloodGroup: [''],
    emergencyContact: [''],
    hobbies: [''],
    hasAllergies: [false],
  });

  protected clearFilters(): void {
    this.statusFilter.set('');
    this.searchFilter.set('');
    this.classFilter.set('');
    this.genderFilter.set('');
    this.houseFilter.set('');
    this.yearFilter.set('');
    this.allergyFilter.set(false);
  }

  protected onYearFilterChange(year: string): void {
    this.yearFilter.set(year);
    this.data.loadStudents(year || undefined);
  }

  protected openDetail(id: number): void {
    void this.router.navigate(['/admin/students', id]);
  }

  protected openAddModal(): void {
    this.formError.set(null);
    this.studentForm.reset({
      firstName: '',
      lastName: '',
      gender: 'Male',
      dob: '',
      dobBs: '',
      languagesSpoken: '',
      address: '',
      classApplied: this.classOptions()[0] ?? 'Class 1',
      rollNo: 1,
      academicYear: this.defaultAcademicYear(),
      status: 'active',
      house: 'Red',
      eal: 'Native',
      admissionDate: '',
      previousSchool: '',
      bloodGroup: '',
      emergencyContact: '',
      hobbies: '',
      hasAllergies: false,
    });
    this.addModalOpen.set(true);
  }

  protected openEditModal(student: AdminStudent): void {
    this.formError.set(null);
    this.editingStudentId.set(student.id);
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      dob: student.dob ? student.dob.slice(0, 10) : '',
      dobBs: student.dobBs,
      languagesSpoken: student.languagesSpoken,
      address: student.address,
      classApplied: student.classApplied,
      rollNo: student.rollNo,
      academicYear: student.academicYear,
      status: student.status,
      house: student.house,
      eal: student.eal,
      admissionDate: student.admissionDate ? student.admissionDate.slice(0, 10) : '',
      previousSchool: student.previousSchool,
      bloodGroup: student.bloodGroup,
      emergencyContact: student.emergencyContact,
      hobbies: student.hobbies,
      hasAllergies: student.hasAllergies,
    });
    this.editModalOpen.set(true);
  }

  protected saveNewStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.formError.set('Please fill in all required fields.');
      return;
    }
    this.saving.set(true);
    this.formError.set(null);
    this.data.addStudent(this.studentForm.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.addModalOpen.set(false);
        this.flash.success('Student record added.');
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.extractApiError(err, 'Failed to add student.'));
      },
    });
  }

  protected saveEditedStudent(): void {
    const id = this.editingStudentId();
    if (id === null || this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.formError.set('Please fill in all required fields.');
      return;
    }
    this.saving.set(true);
    this.formError.set(null);
    this.data.updateStudent(id, this.studentForm.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.editModalOpen.set(false);
        this.flash.success('Student details updated.');
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.extractApiError(err, 'Failed to update student.'));
      },
    });
  }

  protected changeStatus(id: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value as StudentStatus;
    this.data.updateStudentStatus(id, value).subscribe({
      next: () => this.flash.success('Student status updated.'),
      error: (err) => this.flash.error(this.extractApiError(err, 'Failed to update status.')),
    });
  }

  protected deleteStudent(id: number, name: string): void {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    this.data.deleteStudent(id).subscribe({
      next: () => this.flash.success(`${name} deleted.`),
      error: (err) => this.flash.error(this.extractApiError(err, `Failed to delete ${name}.`)),
    });
  }

  private extractApiError(err: unknown, fallback: string): string {
    const e = err as { error?: { message?: string; errors?: Record<string, string[]> } };
    const firstFieldErrors = e?.error?.errors ? Object.values(e.error.errors)[0] : undefined;
    if (firstFieldErrors?.length) {
      return firstFieldErrors[0];
    }
    return e?.error?.message || fallback;
  }

  protected closeAllModals(): void {
    this.addModalOpen.set(false);
    this.editModalOpen.set(false);
    this.quickModal.set(null);
  }

  protected initials(student: AdminStudent): string {
    return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();
  }

  protected houseClass(house: StudentHouse): string {
    switch (house) {
      case 'Red':
        return 'bg-rose-600';
      case 'Blue':
        return 'bg-blue-600';
      case 'Green':
        return 'bg-emerald-600';
      case 'Yellow':
        return 'bg-amber-500';
    }
  }

  protected statusClass(status: StudentStatus): string {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700';
      case 'transferred':
        return 'bg-purple-50 text-purple-700';
      case 'passed_out':
        return 'bg-pink-50 text-pink-700';
      case 'suspended':
        return 'bg-rose-50 text-rose-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
