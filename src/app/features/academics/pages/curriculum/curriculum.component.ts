import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCheckCircle2 } from '@lucide/angular';
import { EyebrowComponent } from '../../../../shared/components/eyebrow/eyebrow.component';
import { LEARNING_AREAS } from '../../academics.data';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [RouterLink, NgComponentOutlet, EyebrowComponent, LucideArrowRight, LucideCheckCircle2],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './curriculum.component.html',
})
export class CurriculumComponent {
  protected readonly learningAreas = LEARNING_AREAS;

  protected readonly understandingPoints = [
    'Conceptual understanding',
    'Problem-solving',
    'Practical learning',
    'Critical thinking',
    'Knowledge application',
  ];
}
