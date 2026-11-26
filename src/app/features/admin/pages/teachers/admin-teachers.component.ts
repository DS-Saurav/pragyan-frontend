import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideBook,
  LucideBriefcase,
  LucideCheck,
  LucideCheckCircle2,
  LucideChevronDown,
  LucideFolderOpen,
  LucidePencil,
  LucidePrinter,
  LucideXCircle,
} from '@lucide/angular';
import type { AdminTeacher, TeacherStatus } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';

@Component({
  selector: 'app-admin-teachers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideBriefcase,
    LucideCheckCircle2,
    LucideBook,
    LucideXCircle,
    LucideFolderOpen,
    LucidePrinter,
    LucidePencil,
    LucideChevronDown,
    LucideCheck,
  ],
  templateUrl: './admin-teachers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class AdminTeachersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  private readonly statusDropdownRef = viewChild<ElementRef<HTMLElement>>('statusDropdown');

  protected readonly statusTab = signal<'all' | TeacherStatus>('all');
  protected readonly statusMenuOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly addModalOpen = signal(false);
  protected readonly editModalOpen = signal(false);
  protected readonly editingTeacherId = signal<number | null>(null);

  protected readonly counts = computed(() => {
    const all = this.data.teachers();
    return {
      all: all.length,
      active: all.filter((t) => t.status === 'active').length,
      inactive: all.filter((t) => t.status === 'inactive').length,
      suspended: all.filter((t) => t.status === 'suspended').length,
      assignments: all.reduce((sum, t) => sum + t.assignmentsCount, 0),
    };
  });

  protected readonly statusOptions = computed(() => {
    const c = this.counts();
    return [
      { value: 'all' as const, label: 'All Statuses', count: c.all, dot: 'bg-[#123552]' },
      { value: 'active' as const, label: 'Active', count: c.active, dot: 'bg-emerald-500' },
      { value: 'inactive' as const, label: 'Inactive', count: c.inactive, dot: 'bg-slate-400' },
      { value: 'suspended' as const, label: 'Suspended', count: c.suspended, dot: 'bg-rose-500' },
    ];
  });

  protected readonly selectedStatusOption = computed(
    () =>
      this.statusOptions().find((opt) => opt.value === this.statusTab()) ??
      this.statusOptions()[0],
  );

  protected toggleStatusMenu(): void {
    this.statusMenuOpen.update((prev) => !prev);
  }

  protected selectStatus(value: 'all' | TeacherStatus): void {
    this.statusTab.set(value);
    this.statusMenuOpen.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.statusMenuOpen()) return;
    const el = this.statusDropdownRef()?.nativeElement;
    if (el && !el.contains(event.target as Node)) {
      this.statusMenuOpen.set(false);
    }
  }

  protected onEscape(): void {
    this.statusMenuOpen.set(false);
    this.closeModals();
  }

  protected readonly filteredTeachers = computed(() => {
    const tab = this.statusTab();
    const q = this.searchQuery().trim().toLowerCase();
    return this.data.teachers().filter((t) => {
      if (tab !== 'all' && t.status !== tab) return false;
      if (q) {
        const hay =
          `${t.firstName} ${t.lastName} ${t.email} ${t.department} ${t.specialization}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  });

  protected readonly teacherForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    department: ['', Validators.required],
    specialization: [''],
    classTeacherOf: [''],
    status: ['active' as TeacherStatus, Validators.required],
  });

  protected openAddModal(): void {
    this.teacherForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      specialization: '',
      classTeacherOf: '',
      status: 'active',
    });
    this.addModalOpen.set(true);
  }

  protected openEditModal(teacher: AdminTeacher): void {
    this.editingTeacherId.set(teacher.id);
    this.teacherForm.patchValue({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      specialization: teacher.specialization,
      classTeacherOf: teacher.classTeacherOf ?? '',
      status: teacher.status,
    });
    this.editModalOpen.set(true);
  }

  protected saveNewTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const raw = this.teacherForm.getRawValue();
    this.data.addTeacher({
      ...raw,
      classTeacherOf: raw.classTeacherOf.trim() || null,
    });
    this.addModalOpen.set(false);
    this.flash.success('Teacher registered successfully.');
  }

  protected saveEditedTeacher(): void {
    const id = this.editingTeacherId();
    if (id === null || this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const raw = this.teacherForm.getRawValue();
    this.data.updateTeacher(id, {
      ...raw,
      classTeacherOf: raw.classTeacherOf.trim() || null,
    });
    this.editModalOpen.set(false);
    this.flash.success('Teacher details updated.');
  }

  protected closeModals(): void {
    this.addModalOpen.set(false);
    this.editModalOpen.set(false);
  }

  protected exportCsv(): void {
    this.flash.info('CSV export prepared for Teachers.');
  }

  protected printPage(): void {
    if (typeof window !== 'undefined') window.print();
  }
}
