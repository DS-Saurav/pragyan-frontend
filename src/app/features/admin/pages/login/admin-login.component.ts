import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideCheckCircle2 } from '@lucide/angular';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmButton,
    HlmInput,
    HlmLabel,
    LucideCheckCircle2,
  ],
  templateUrl: './admin-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly data = inject(AdminDataService);

  protected readonly schoolName = this.data.settings().schoolName;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    email: ['admin@pragyan.edu.np', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  constructor() {
    if (this.auth.isAuthenticated()) {
      void this.router.navigate(['/admin/dashboard']);
    }
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { email, password, remember } = this.form.getRawValue();
    this.auth.login$(email, password, remember).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigate(['/admin/dashboard']);
      },
      error: (err: { error?: { message?: string } }) => {
        this.submitting.set(false);
        this.errorMessage.set(
          err?.error?.message ?? 'Unable to sign in. Please check your credentials.',
        );
      },
    });
  }
}
