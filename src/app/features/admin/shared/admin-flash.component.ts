import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  LucideAlertTriangle,
  LucideCheckCircle2,
  LucideInfo,
  LucideX,
  LucideXCircle,
} from '@lucide/angular';
import { AdminFlashService } from '../services/admin-flash.service';

@Component({
  selector: 'app-admin-flash',
  standalone: true,
  imports: [LucideCheckCircle2, LucideXCircle, LucideAlertTriangle, LucideInfo, LucideX],
  templateUrl: './admin-flash.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFlashComponent {
  protected readonly flash = inject(AdminFlashService);
}
