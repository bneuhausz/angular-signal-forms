import { Component, signal } from "@angular/core";
import { form, Control } from "@angular/forms/signals";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-simple-form',
  imports: [MatFormFieldModule, MatInputModule, Control],
  template: `
    <form>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [control]="f.firstName" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput [control]="f.lastName" />
      </mat-form-field>
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
    firstName: '',
    lastName: ''
  }));
}
