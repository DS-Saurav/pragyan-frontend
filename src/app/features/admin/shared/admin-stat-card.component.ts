import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, Type } from '@angular/core';
import type { StatTone } from '../models/admin.models';

const TONE_MAP: Record<StatTone, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100',
  slate: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
};

@Component({
  selector: 'app-admin-stat-card',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './admin-stat-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminStatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number | string>();
  readonly icon = input.required<Type<unknown>>();
  readonly tone = input<StatTone>('blue');

  protected readonly toneClass = computed(() => TONE_MAP[this.tone()] ?? TONE_MAP.blue);
}
