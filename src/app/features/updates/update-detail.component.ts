import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideInfo } from '@lucide/angular';
import { combineLatest, map, switchMap } from 'rxjs';
import { SchoolContentService } from '../../core/services/school-content.service';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';
import { UpdateMetaComponent } from '../../shared/components/update-meta/update-meta.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-update-detail',
  standalone: true,
  imports: [
    RouterLink,
    PageIntroComponent,
    UpdateMetaComponent,
    NotFoundComponent,
    LucideArrowLeft,
    LucideInfo,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './update-detail.component.html',
})
export class UpdateDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(SchoolContentService);

  protected readonly article = toSignal(
    combineLatest([this.route.paramMap, this.route.url]).pipe(
      map(([params, segments]) => ({
        slug: params.get('slug') ?? '',
        kind: segments[0]?.path ?? 'news',
      })),
      switchMap(({ kind, slug }) => this.content.getUpdateByKindAndSlug$(kind, slug)),
    ),
    { initialValue: undefined },
  );

  protected readonly sectionLabel = computed(() => {
    const item = this.article();
    return item ? this.content.updateSections[item.kind].label : '';
  });
}
