import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  readonly categories = input.required<string[]>();
  readonly active = input.required<string>();
  readonly label = input.required<string>();
  readonly categoryChange = output<string>();

  protected readonly allCategories = computed(() => ['All', ...this.categories()]);
}
