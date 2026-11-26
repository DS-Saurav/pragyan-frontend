import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCheck,
  LucideImage,
  LucideTrash2,
  LucideUpload,
} from '@lucide/angular';
import { AdminFlashService } from '../../services/admin-flash.service';

export interface HeroSlideItem {
  id: number;
  src: string;
  alt: string;
  sortOrder: number;
  isActive: boolean;
}

@Component({
  selector: 'app-admin-public-photos',
  standalone: true,
  imports: [
    FormsModule,
    LucideImage,
    LucideUpload,
    LucideArrowUp,
    LucideArrowDown,
    LucideCheck,
    LucideTrash2,
  ],
  templateUrl: './admin-public-photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeUploadModal()',
  },
})
export class AdminPublicPhotosComponent {
  private readonly http = inject(HttpClient);
  private readonly flash = inject(AdminFlashService);

  protected readonly slides = signal<HeroSlideItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly uploading = signal(false);
  protected readonly uploadModalOpen = signal(false);
  protected readonly uploadError = signal<string | null>(null);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly previewUrl = signal<string | null>(null);
  protected readonly altText = signal('');
  protected readonly isActive = signal(true);
  protected readonly draftAltById = signal<Record<number, string>>({});

  constructor() {
    this.loadSlides();
  }

  protected loadSlides(): void {
    this.loading.set(true);
    this.http.get<{ slides: HeroSlideItem[] }>('/api/admin/hero-slides').subscribe({
      next: (res) => {
        this.slides.set(res.slides);
        const map: Record<number, string> = {};
        for (const s of res.slides) {
          map[s.id] = s.alt;
        }
        this.draftAltById.set(map);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.flash.error('Could not load hero slides.');
      },
    });
  }

  protected openUploadModal(): void {
    this.uploadError.set(null);
    this.selectedFile.set(null);
    const prev = this.previewUrl();
    if (prev) URL.revokeObjectURL(prev);
    this.previewUrl.set(null);
    this.altText.set('');
    this.isActive.set(true);
    this.uploadModalOpen.set(true);
  }

  protected closeUploadModal(): void {
    if (this.uploading()) return;
    this.uploadModalOpen.set(false);
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectedFile.set(file);

    const prev = this.previewUrl();
    if (prev) URL.revokeObjectURL(prev);

    if (file) {
      this.previewUrl.set(URL.createObjectURL(file));
    } else {
      this.previewUrl.set(null);
    }
  }

  protected uploadSlide(fileInput: HTMLInputElement): void {
    const file = this.selectedFile();
    if (!file) {
      this.uploadError.set('Please choose an image file first.');
      this.flash.error('Please choose an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', this.altText().trim() || 'Pragyan Paathshala campus');
    formData.append('is_active', this.isActive() ? '1' : '0');

    this.uploading.set(true);
    this.uploadError.set(null);
    this.http.post<{ slide: HeroSlideItem }>('/api/admin/hero-slides', formData).subscribe({
      next: (res) => {
        this.slides.update((list) => [...list, res.slide]);
        this.draftAltById.update((m) => ({ ...m, [res.slide.id]: res.slide.alt }));
        this.selectedFile.set(null);
        const prev = this.previewUrl();
        if (prev) URL.revokeObjectURL(prev);
        this.previewUrl.set(null);
        this.altText.set('');
        this.isActive.set(true);
        fileInput.value = '';
        this.uploading.set(false);
        this.uploadModalOpen.set(false);
        this.flash.success('Hero slide uploaded.');
      },
      error: (err) => {
        this.uploading.set(false);
        const msg = this.extractApiError(err, 'Failed to upload hero slide.');
        this.uploadError.set(msg);
        this.flash.error(msg);
      },
    });
  }

  private extractApiError(err: unknown, fallback: string): string {
    const e = err as {
      status?: number;
      error?: { message?: string; errors?: Record<string, string[]> };
    };
    const firstFieldErrors = e?.error?.errors ? Object.values(e.error.errors)[0] : undefined;
    if (firstFieldErrors?.length) {
      return firstFieldErrors[0];
    }
    if (e?.error?.message) {
      return e.error.message;
    }
    if (e?.status === 413) {
      return 'Image file is too large for the server.';
    }
    return fallback;
  }

  protected setDraftAlt(id: number, value: string): void {
    this.draftAltById.update((m) => ({ ...m, [id]: value }));
  }

  protected saveAlt(slide: HeroSlideItem): void {
    const alt = (this.draftAltById()[slide.id] ?? '').trim();
    this.http
      .patch<{ slide: HeroSlideItem }>(`/api/admin/hero-slides/${slide.id}`, { alt_text: alt })
      .subscribe({
        next: (res) => {
          this.slides.update((list) => list.map((s) => (s.id === slide.id ? res.slide : s)));
          this.flash.success('Slide caption updated.');
        },
        error: () => this.flash.error('Failed to update slide.'),
      });
  }

  protected toggleActive(slide: HeroSlideItem): void {
    this.http
      .patch<{ slide: HeroSlideItem }>(`/api/admin/hero-slides/${slide.id}`, {
        is_active: !slide.isActive,
      })
      .subscribe({
        next: (res) => {
          this.slides.update((list) => list.map((s) => (s.id === slide.id ? res.slide : s)));
          this.flash.success(res.slide.isActive ? 'Slide enabled.' : 'Slide hidden.');
        },
        error: () => this.flash.error('Failed to update slide status.'),
      });
  }

  protected moveSlide(index: number, direction: -1 | 1): void {
    const list = [...this.slides()];
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    this.slides.set(list);

    this.http
      .patch<{ slides: HeroSlideItem[] }>('/api/admin/hero-slides/reorder', {
        ids: list.map((s) => s.id),
      })
      .subscribe({
        next: (res) => this.slides.set(res.slides),
        error: () => {
          this.flash.error('Failed to reorder slides.');
          this.loadSlides();
        },
      });
  }

  protected deleteSlide(slide: HeroSlideItem): void {
    if (!confirm('Delete this hero slide? This cannot be undone.')) return;
    this.http.delete(`/api/admin/hero-slides/${slide.id}`).subscribe({
      next: () => {
        this.slides.update((list) => list.filter((s) => s.id !== slide.id));
        this.flash.success('Hero slide deleted.');
      },
      error: () => this.flash.error('Failed to delete slide.'),
    });
  }
}
