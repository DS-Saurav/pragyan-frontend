import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Type } from '@angular/core';
import { LucideInbox } from '@lucide/angular';

@Component({
  selector: 'app-admin-empty-state',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './admin-empty-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEmptyStateComponent {
  readonly icon = input<Type<unknown>>(LucideInbox);
  readonly title = input.required<string>();
  readonly message = input<string | null>(null);
}
