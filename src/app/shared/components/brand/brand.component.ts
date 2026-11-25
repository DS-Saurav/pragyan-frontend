import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolContentService } from '../../../core/services/school-content.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brand.component.html',
})
export class BrandComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly school = this.content.school;
}
