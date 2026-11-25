import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight } from '@lucide/angular';
import { SchoolContentService } from '../../../core/services/school-content.service';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, BrandComponent, LucideArrowUpRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly content = inject(SchoolContentService);
  protected readonly school = this.content.school;
  protected readonly mapsUrl = this.content.mapsUrl;
  protected readonly year = new Date().getFullYear();
}
