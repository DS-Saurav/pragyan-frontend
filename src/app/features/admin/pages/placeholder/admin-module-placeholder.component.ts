import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideLayers } from '@lucide/angular';
import { map } from 'rxjs';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

interface PlaceholderMeta {
  title: string;
  section: string;
  description: string;
  icon: Type<unknown>;
}

@Component({
  selector: 'app-admin-module-placeholder',
  standalone: true,
  imports: [RouterLink, NgComponentOutlet, AdminPageHeaderComponent],
  templateUrl: './admin-module-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminModulePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly meta = toSignal(
    this.route.data.pipe(
      map((d) => ({
        title: (d['title'] as string) ?? 'Module',
        section: (d['section'] as string) ?? 'Administration',
        description:
          (d['description'] as string) ??
          'This module will be connected to the Laravel API in the next phase.',
        icon: (d['icon'] as Type<unknown>) ?? LucideLayers,
      })),
    ),
    {
      initialValue: {
        title: 'Module',
        section: 'Administration',
        description: 'This module will be connected to the Laravel API in the next phase.',
        icon: LucideLayers,
      } satisfies PlaceholderMeta,
    },
  );
}
