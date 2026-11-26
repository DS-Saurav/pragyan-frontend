import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCheckCircle2, LucideGraduationCap } from '@lucide/angular';
import { EyebrowComponent } from '../../../../shared/components/eyebrow/eyebrow.component';
import { ACADEMIC_LEVELS } from '../../academics.data';

@Component({
  selector: 'app-academic-levels',
  standalone: true,
  imports: [RouterLink, EyebrowComponent, LucideArrowRight, LucideCheckCircle2, LucideGraduationCap],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './academic-levels.component.html',
})
export class AcademicLevelsComponent {
  protected readonly levels = ACADEMIC_LEVELS;
}
