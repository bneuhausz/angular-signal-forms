import { Component, resource, signal } from "@angular/core";
import { form, Control, validateHttp, customError, validateAsync } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-async-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Control],
  template: `
    <form>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [control]="f.firstName" />
        @if (f.firstName().invalid()) {
          <mat-error>{{ f.firstName().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput [control]="f.lastName" />
        @if (f.lastName().invalid()) {
          <mat-error>{{ f.lastName().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <button mat-button type="button" [disabled]="f().invalid()">Submit</button>
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
      gap: 1rem;
    }
  `
})
export default class AsyncForm {
  f = form(signal({
    firstName: '',
    lastName: ''
  }), p => {
    validateHttp(p.firstName, {
      request: ({ value }) => { return value() ? `http://localhost:3000/api/validate/first-name/${value()}` : undefined },
      errors: (res: any) => !res.valid ? customError({ kind: 'notUnique', message: 'First name is not unique' }) : []
    });
    validateAsync(p.lastName, {
      params: ({ value }) => value(),
      factory: (value) => resource({
        params: () => value(),
        loader: async ({ params }) => {
          if (!params) {
            return undefined;
          }
          const res = await fetch(`http://localhost:3000/api/validate/last-name/${params}`);
          return res.json();
        }
      }),
      errors: (res: any) => !res.valid ? customError({ kind: 'notUnique', message: 'Last name is not unique' }) : []
    });
  });
}
