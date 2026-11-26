import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideInfo, LucideSave } from '@lucide/angular';
import { map } from 'rxjs';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

@Component({
  selector: 'app-admin-news-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AdminPageHeaderComponent, LucideInfo, LucideSave],
  templateUrl: './admin-news-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNewsFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  private readonly storyIdParam = toSignal(
    this.route.paramMap.pipe(map((p) => (p.get('id') ? Number(p.get('id')) : null))),
    { initialValue: null },
  );

  protected readonly story = computed(() => {
    const id = this.storyIdParam();
    if (id === null) return null;
    return this.data.newsStories().find((s) => s.id === id) ?? null;
  });

  protected readonly isEditing = computed(() => this.story() !== null);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(180)]],
    slug: [''],
    category: ['Learning', Validators.maxLength(60)],
    summary: ['', [Validators.required, Validators.maxLength(600)]],
    bodyMarkdown: ['', [Validators.required, Validators.maxLength(30000)]],
  });

  constructor() {
    const current = this.story();
    if (current) {
      this.form.patchValue({
        title: current.title,
        slug: current.slug ?? '',
        category: current.category,
        summary: current.summary,
        bodyMarkdown: current.bodyMarkdown,
      });
    }
  }

  protected saveRevision(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const saved = this.data.saveNews(this.story()?.id ?? null, {
      title: raw.title,
      slug: raw.slug.trim() || null,
      category: raw.category.trim() || 'Learning',
      summary: raw.summary,
      bodyMarkdown: raw.bodyMarkdown,
    });
    this.flash.success('Private story revision saved.');
    if (!this.isEditing()) {
      void this.router.navigate(['/admin/news', saved.id, 'edit']);
    }
  }

  protected transition(
    action: 'submit' | 'approve' | 'publish' | 'withdraw' | 'archive' | 'restore',
  ): void {
    const current = this.story();
    if (!current) return;
    if (action === 'archive' && !confirm('Archive this news story?')) return;
    this.data.transitionNews(current.id, action);
    this.flash.success(`Story workflow updated (${action}).`);
  }
}
