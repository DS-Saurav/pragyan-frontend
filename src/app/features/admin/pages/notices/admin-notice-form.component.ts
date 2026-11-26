import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideInfo, LucideSave } from '@lucide/angular';
import { map } from 'rxjs';
import type { AdminNotice } from '../../models/admin.models';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

@Component({
  selector: 'app-admin-notice-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    AdminPageHeaderComponent,
    LucideInfo,
    LucideSave,
  ],
  templateUrl: './admin-notice-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNoticeFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  private readonly noticeIdParam = toSignal(
    this.route.paramMap.pipe(map((p) => (p.get('id') ? Number(p.get('id')) : null))),
    { initialValue: null },
  );

  protected readonly notice = computed(() => {
    const id = this.noticeIdParam();
    if (id === null) return null;
    return this.data.notices().find((n) => n.id === id) ?? null;
  });

  protected readonly isEditing = computed(() => this.notice() !== null);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(180)]],
    slug: [''],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    audience: ['public' as AdminNotice['audience'], Validators.required],
    priority: [''],
    content: ['', [Validators.required, Validators.maxLength(30000)]],
    scheduledFor: [''],
    isUrgent: [false],
  });

  constructor() {
    const current = this.notice();
    if (current) {
      this.form.patchValue({
        title: current.title,
        slug: current.slug ?? '',
        date: current.date,
        audience: current.audience,
        priority: current.priority !== null ? String(current.priority) : '',
        content: current.content,
        scheduledFor: current.scheduledFor ?? '',
        isUrgent: current.isUrgent,
      });
    }
  }

  protected saveRevision(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const saved = this.data.saveNotice(this.notice()?.id ?? null, {
      title: raw.title,
      slug: raw.slug.trim() || null,
      date: raw.date,
      audience: raw.audience,
      priority: raw.priority ? Number(raw.priority) : null,
      content: raw.content,
      scheduledFor: raw.scheduledFor.trim() || null,
      isUrgent: raw.isUrgent,
    });
    this.flash.success('Private notice revision saved.');
    if (!this.isEditing()) {
      void this.router.navigate(['/admin/notices', saved.id, 'edit']);
    }
  }

  protected transition(
    action: 'submit' | 'approve' | 'publish' | 'withdraw' | 'archive' | 'restore',
  ): void {
    const current = this.notice();
    if (!current) return;
    if (action === 'archive' && !confirm('Archive this notice? It will no longer be public.')) {
      return;
    }
    this.data.transitionNotice(current.id, action);
    this.flash.success(`Notice workflow updated (${action}).`);
  }
}
