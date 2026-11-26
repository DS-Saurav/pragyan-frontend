import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideBuilding2, LucideCheckCircle2, LucideLayoutTemplate, LucidePalette } from '@lucide/angular';
import { AdminDataService } from '../../services/admin-data.service';
import { AdminFlashService } from '../../services/admin-flash.service';
import { AdminPageHeaderComponent } from '../../shared/admin-page-header.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AdminPageHeaderComponent,
    LucideLayoutTemplate,
    LucideCheckCircle2,
    LucideBuilding2,
    LucidePalette,
  ],
  templateUrl: './admin-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSettingsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(AdminDataService);
  private readonly flash = inject(AdminFlashService);

  protected readonly presets = [
    { label: 'Navy (default)', primary: '#0f2248', accent: '#16a34a' },
    { label: 'Royal blue', primary: '#1e3a8a', accent: '#2563eb' },
    { label: 'Forest', primary: '#064e3b', accent: '#059669' },
    { label: 'Maroon', primary: '#7f1d1d', accent: '#dc2626' },
    { label: 'Plum', primary: '#581c87', accent: '#9333ea' },
    { label: 'Charcoal', primary: '#1f2937', accent: '#4b5563' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    schoolName: [this.data.settings().schoolName, Validators.required],
    tagline: [this.data.settings().tagline],
    address: [this.data.settings().address],
    phone: [this.data.settings().phone],
    email: [this.data.settings().email, Validators.email],
    website: [this.data.settings().website],
    logoUrl: [this.data.settings().logoUrl],
    timeZone: [this.data.settings().timeZone],
    currencySymbol: [this.data.settings().currencySymbol],
    academicYear: [this.data.settings().academicYear],
    primaryColor: [this.data.settings().primaryColor],
    accentColor: [this.data.settings().accentColor],
  });

  protected applyPreset(primary: string, accent: string): void {
    this.form.patchValue({ primaryColor: primary, accentColor: accent });
  }

  protected saveSettings(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.data.updateSettings(this.form.getRawValue());
    this.flash.success('School settings updated.');
  }
}
