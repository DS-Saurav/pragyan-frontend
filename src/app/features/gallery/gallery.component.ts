import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideX,
} from '@lucide/angular';
import { SchoolContentService } from '../../core/services/school-content.service';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    PageIntroComponent,
    FiltersComponent,
    PhotoComponent,
    LucideArrowUpRight,
    LucideX,
    LucideChevronLeft,
    LucideChevronRight,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  private readonly content = inject(SchoolContentService);
  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');

  protected readonly category = signal('All');
  protected readonly selectedIndex = signal<number | null>(null);
  private triggerEl: HTMLButtonElement | null = null;

  protected readonly categories = computed(() => [
    ...new Set(this.content.photos().map((p) => p.category)),
  ]);

  protected readonly items = computed(() => {
    const active = this.category();
    const all = this.content.photos();
    return active === 'All' ? all : all.filter((p) => p.category === active);
  });

  protected readonly activePhoto = computed(() => {
    const idx = this.selectedIndex();
    return idx === null ? null : (this.items()[idx] ?? null);
  });

  constructor() {
    effect(() => {
      const isOpen = this.selectedIndex() !== null;
      const modal = this.dialogRef()?.nativeElement;
      if (isOpen && modal && !modal.open) {
        modal.showModal();
      }
    });
  }

  protected onCategoryChange(next: string): void {
    this.category.set(next);
    this.selectedIndex.set(null);
  }

  protected openLightbox(index: number, event: Event): void {
    this.triggerEl = event.currentTarget as HTMLButtonElement;
    this.selectedIndex.set(index);
  }

  protected closeLightbox(): void {
    this.dialogRef()?.nativeElement.close();
  }

  protected onDialogClose(): void {
    this.selectedIndex.set(null);
    this.triggerEl?.focus();
  }

  protected onDialogBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  protected onDialogKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.step(1);
    }
  }

  protected step(direction: number): void {
    const len = this.items().length;
    if (len === 0) return;
    this.selectedIndex.update((idx) => (idx === null ? null : (idx + direction + len) % len));
  }
}
