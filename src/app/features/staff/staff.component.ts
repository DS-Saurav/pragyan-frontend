import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideUsersRound } from '@lucide/angular';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [RouterLink, PageIntroComponent, LucideUsersRound, LucideArrowRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './staff.component.html',
})
export class StaffComponent {}
