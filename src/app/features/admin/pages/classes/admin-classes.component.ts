import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideBuilding2, LucideCalendar, LucideTrash2, LucideUsers } from '@lucide/angular';
import { HlmButton } from '@spartan-ng/helm/button';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';

@Component({
  selector: 'app-admin-classes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmButton,
    LucideBuilding2,
    LucideCalendar,
    LucideUsers,
    LucideTrash2,
  ],
  templateUrl: './admin-classes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'openModal.set(false)',
  },
})
export class AdminClassesComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  protected readonly openModal = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly pageSize = signal(10);

  protected readonly teachers = this.data.teachers;
  protected readonly filteredClasses = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const list = this.data.classes();
    if (!q) return list.slice(0, this.pageSize());
    return list
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.section.toLowerCase().includes(q) ||
          c.room.toLowerCase().includes(q) ||
          c.classTeacher.toLowerCase().includes(q),
      )
      .slice(0, this.pageSize());
  });

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    section: ['A' as 'A' | 'B' | 'C' | 'D', Validators.required],
    academicYear: ['2082-2083', Validators.required],
    capacity: [35, [Validators.required, Validators.min(1)]],
    room: [''],
    classTeacher: [''],
    status: ['active' as 'active' | 'inactive'],
  });

  protected addClass(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    this.data.addClass({
      name: raw.name,
      section: raw.section,
      academicYear: raw.academicYear,
      capacity: Number(raw.capacity) || 35,
      room: raw.room || 'Room 101',
      classTeacher: raw.classTeacher || 'Unassigned',
      status: raw.status,
    });
    this.openModal.set(false);
    this.form.reset({
      name: '',
      section: 'A',
      academicYear: '2082-2083',
      capacity: 35,
      room: '',
      classTeacher: '',
      status: 'active',
    });
    this.flash.success('Class and section added successfully.');
  }

  protected deleteClass(id: number, label: string): void {
    if (!confirm(`Delete ${label}?`)) return;
    this.data.deleteClass(id);
    this.flash.success(`${label} deleted.`);
  }

  protected exportCsv(): void {
    this.flash.info('CSV export prepared for Classes & Sections.');
  }

  protected printPage(): void {
    if (typeof window !== 'undefined') window.print();
  }
}
