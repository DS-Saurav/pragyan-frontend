import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { map } from 'rxjs';
import type { UpdateKind } from '../../core/models/school.models';
import { SchoolContentService } from '../../core/services/school-content.service';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { NoticeListComponent } from '../../shared/components/notice-list/notice-list.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { UpdateMetaComponent } from '../../shared/components/update-meta/update-meta.component';

@Component({
  selector: 'app-updates-directory',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    PageIntroComponent,
    FiltersComponent,
    NoticeListComponent,
    PhotoComponent,
    UpdateMetaComponent,
    LucideArrowRight,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './updates-directory.component.html',
})
export class UpdatesDirectoryComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly content = inject(SchoolContentService);

  protected readonly kind = toSignal(
    this.route.data.pipe(map((data) => (data['kind'] as UpdateKind) ?? 'events')),
    { initialValue: 'events' as UpdateKind },
  );

  protected readonly category = signal('All');

  protected readonly tabs = (Object.entries(this.content.updateSections) as [
    UpdateKind,
    { label: string; description: string },
  ][])
    .filter(([key]) => key !== 'news')
    .map(([key, meta]) => ({ key, label: meta.label }));

  protected readonly sectionMeta = computed(() => this.content.updateSections[this.kind()]);

  protected readonly items = computed(() =>
    this.content.updates().filter((item) => item.kind === this.kind()),
  );

  protected readonly hasOfficialItems = computed(() =>
    this.items().some((item) => !item.sample),
  );

  protected readonly categories = computed(() => [
    ...new Set(this.items().map((item) => item.category)),
  ]);

  protected readonly visibleItems = computed(() => {
    const active = this.category();
    return this.items().filter((item) => active === 'All' || item.category === active);
  });
}
