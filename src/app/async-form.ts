import { Component, resource, signal } from "@angular/core";
import { form, Field, validateHttp, customError, validateAsync } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-async-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Field],
  template: `
    <form>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [field]="f.firstName" />
        @if (f.firstName().invalid()) {
          <mat-error>{{ f.firstName().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput [field]="f.lastName" />
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
      onSuccess(res: any) {
        if (!res.valid) {
          return [customError({ kind: 'notUnique', message: 'First name is not unique' })];
        }
        return null;
      },
      onError(error: unknown) {
        console.error('Async validation error:', error);
      },
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
      onSuccess(res: any) {
        if (!res.valid) {
          return [customError({ kind: 'notUnique', message: 'Last name is not unique' })];
        }
        return null;
      },
      onError(error: unknown) {
        console.error('Async validation error:', error);
      },
    });
  });
}
