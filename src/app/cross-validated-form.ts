import { Component, signal } from "@angular/core";
import { form, Control, required, validate, customError } from "@angular/forms/signals";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-cross-validated-form',
  imports: [MatFormFieldModule, MatInputModule, Control],
  template: `
    <form>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput [control]="f.password" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input matInput [control]="f.confirm" />
      </mat-form-field>

      @if (f().errors()[0]?.kind === 'passwordMissmatch') {
        <mat-error>{{ f().errors()[0]?.message }}</mat-error>
      }
      
    </form>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
    }
  `
})
export default class SimpleForm {
  f = form(signal({
    password: '',
    confirm: ''
  }), p => {
    required(p.password, { message: 'Password is required' });
    required(p.confirm, { message: 'Please confirm your password' });
    validate(p, ({ value }) => {
      if (value().password !== value().confirm) {
        return customError({ kind: 'passwordMissmatch', message: 'The password and the password confirmation do not match' });
      }
      return [];
    });
  });
}
