import { JsonPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { form, FormField, debounce } from "@angular/forms/signals";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-debounced-form',
  imports: [MatFormFieldModule, MatInputModule, FormField, JsonPipe],
  template: `
    <form>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [formField]="f.firstName" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput [formField]="f.lastName" />
      </mat-form-field>
    </form>

    <span>Form value: {{ f().value() | json }}</span>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
    }
  `
})
export default class DebouncedForm {
  f = form(signal({
    firstName: '',
    lastName: ''
  }), p => {
    debounce(p.firstName, 1000);
    debounce(p.lastName, () => new Promise(resolve => setTimeout(resolve, 2000)));
  });
}
