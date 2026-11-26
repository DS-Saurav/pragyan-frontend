import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { EyebrowComponent } from '../../../../shared/components/eyebrow/eyebrow.component';
import { ENVIRONMENT_GALLERY, TEACHING_PRINCIPLES } from '../../academics.data';

@Component({
  selector: 'app-teaching-learning',
  standalone: true,
  imports: [RouterLink, NgComponentOutlet, EyebrowComponent, LucideArrowRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './teaching-learning.component.html',
})
export class TeachingLearningComponent {
  protected readonly principles = TEACHING_PRINCIPLES;
  protected readonly gallery = ENVIRONMENT_GALLERY;
}
