import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CreateUserDialogData {
  title: string;
}

export const createUserDialogConfig: MatDialogConfig<CreateUserDialogData> = {
  width: '400px',
  maxWidth: '100vw',
  panelClass: 'create-dialog-panel',
};

@Component({
  selector: 'lu-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {

  public form!: FormGroup; // definite assignment
  public languages: string[] = ['es', 'en', 'other']; // perhaps create a Map
  public selectedLang = '';

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: CreateUserDialogData,
    private fb: FormBuilder
  ) {
    console.log(dialogData);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public onSelectedLang(lang: string): void {
    this.selectedLang = lang;
  }

  public getFullNameErrorMessage(): string {
    if (this.lnameControl.hasError('required') || this.fnameControl.hasError('required')) {
      return 'You must enter your firs and last name.';
    }
    return '';
  }

  public getLanguageErrorMessage(): string {
    if (this.languageControl.hasError('required')) {
      return 'You must choose your language of choice.';
    }
    return '';
  }

  public getPasswordErrorMessage(): string {
    if (this.passwordControl.hasError('required')) {
      return 'You must enter your password data.';
    }
    if (this.passwordControl?.errors && this.passwordControl?.errors?.actualLength < 8) {
      return 'Password must contain at least 8 characters.';
    }
    return '';
  }

  public getNoSelectedLanguageErrorMessage(): boolean {
    const control = this.languageControl;
    return (control.dirty || control.touched) && control.invalid;
  }

  public getEmailErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'You must enter an email address.';
    }
    if (this.emailControl.hasError('email')) {
      return 'You must enter a valid email address.';
    }
    return '';
  }

  get emailControl(): AbstractControl {
    return this.form.controls.email;
  }

  get usernameControl(): AbstractControl {
    return this.form.controls.username;
  }

  get passwordControl(): AbstractControl {
    return this.form.controls.password;
  }

  get lnameControl(): AbstractControl {
    return this.form.controls.last_name;
  }

  get fnameControl(): AbstractControl {
    return this.form.controls.first_name;
  }

  get languageControl(): AbstractControl {
    return this.form.controls.language;
  }

  get formErrors(): ValidationErrors | null {
    return this.form.errors;
  }

  public createUser(): void {
    if (!this.form.valid) {
      return;
    }
    // TODO return to this
    this.dialogRef.close({ User: this.form.value });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      language: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', [Validators.required]],
      first_name: ['', [Validators.required]]
    });
  }

}
