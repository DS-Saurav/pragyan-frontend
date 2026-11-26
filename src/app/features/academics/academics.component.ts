import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCheckCircle2,
  LucideGraduationCap,
} from '@lucide/angular';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import {
  ACADEMIC_LEVELS,
  ENVIRONMENT_GALLERY,
  LEARNING_AREAS,
  STUDENT_ACTIVITIES,
  TEACHING_PRINCIPLES,
} from './academics.data';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [
    RouterLink,
    NgComponentOutlet,
    EyebrowComponent,
    LucideArrowRight,
    LucideCheckCircle2,
    LucideGraduationCap,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './academics.component.html',
})
export class AcademicsComponent {
  protected readonly academicLevels = ACADEMIC_LEVELS;
  protected readonly learningPrinciples = TEACHING_PRINCIPLES;
  protected readonly learningAreas = LEARNING_AREAS;
  protected readonly beyondClassroom = STUDENT_ACTIVITIES;
  protected readonly environmentShowcase = ENVIRONMENT_GALLERY;

  protected readonly secondaryHighlights: string[] = [
    'Grades 9 and 10 continuous academic pathway',
    'Strengthening subject understanding and study discipline',
    'Critical thinking and independent problem-solving',
    'Focused preparation for the Secondary Education Examination (SEE)',
  ];
}
