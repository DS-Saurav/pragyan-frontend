import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideArrowRight, LucideCheck, LucideInfo } from '@lucide/angular';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { SchoolContentService } from '../../../core/services/school-content.service';

let nextFormId = 0;

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmButton,
    HlmInput,
    HlmTextarea,
    HlmLabel,
    LucideInfo,
    LucideArrowRight,
    LucideCheck,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inquiry-form.component.html',
})
export class InquiryFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly content = inject(SchoolContentService);

  readonly mode = input<'admissions' | 'contact'>('contact');
  protected readonly isAdmissions = computed(() => this.mode() === 'admissions');
  protected readonly gradeOptions = this.content.gradeOptions;
  protected readonly checked = signal(false);
  protected readonly noteId = `inquiry-note-${++nextFormId}`;

  protected readonly form = this.fb.nonNullable.group({
    student: [''],
    guardian: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    grade: ['', Validators.required],
    message: [''],
  });

  constructor() {
    effect(() => {
      const admissions = this.isAdmissions();
      const studentCtrl = this.form.controls.student;
      const messageCtrl = this.form.controls.message;

      if (admissions) {
        studentCtrl.setValidators([Validators.required]);
        messageCtrl.clearValidators();
      } else {
        studentCtrl.clearValidators();
        messageCtrl.setValidators([Validators.required]);
      }
      studentCtrl.updateValueAndValidity({ emitEvent: false });
      messageCtrl.updateValueAndValidity({ emitEvent: false });
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.checked()) {
        this.checked.set(false);
      }
    });
  }

  protected previewInquiry(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.checked.set(true);
  }

  protected isInvalid(name: 'student' | 'guardian' | 'phone' | 'email' | 'grade' | 'message'): boolean {
    const ctrl = this.form.controls[name];
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}
