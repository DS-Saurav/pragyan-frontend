import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AchievementShowcaseComponent } from '../../shared/components/achievement-showcase/achievement-showcase.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [PageIntroComponent, AchievementShowcaseComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-intro
      label="Student Achievements"
      title="Celebrating Excellence, Inspiring Tomorrow"
      description="Explore student milestones across academics, sports, creative arts, and co-curricular activities at Pragyan Paathshala."
    />
    <app-achievement-showcase [showViewAll]="false" [compactIntro]="false" />
  `,
})
export class AchievementsComponent {}
