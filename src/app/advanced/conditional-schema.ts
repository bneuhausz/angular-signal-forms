import { JsonPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { form, Control, schema, required, apply, applyWhen } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

type NameSchema = {
  firstName: string;
  lastName: string;
};

type AddressSchema = {
  street: string;
  city: string;
};

type Person = {
  name: NameSchema;
  address: AddressSchema;
  canReceiveNewspaper: boolean;
}

const nameSchema = schema<NameSchema>((p) => {
  required(p.firstName, { message: 'First name is required' });
  required(p.lastName, { message: 'Last name is required' });
});

const addressSchema = schema<AddressSchema>((p) => {
  required(p.street, { message: 'Street is required' });
  required(p.city, { message: 'City is required' });
});

@Component({
  selector: 'app-conditional-schema',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatCheckboxModule, JsonPipe, Control],
  template: `
    <form>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [control]="f.name.firstName" />
        @if (f.name.firstName().invalid()) {
          <mat-error>{{ f.name.firstName().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput [control]="f.name.lastName" />
        @if (f.name.lastName().invalid()) {
          <mat-error>{{ f.name.lastName().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <mat-divider></mat-divider>

      <mat-checkbox [control]="f.canReceiveNewspaper">Send me newspapers!</mat-checkbox>

      <mat-form-field>
        <mat-label>Street</mat-label>
        <input matInput [control]="f.address.street" />
        @if (f.address.street().invalid()) {
          <mat-error>{{ f.address.street().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>City</mat-label>
        <input matInput [control]="f.address.city" />
        @if (f.address.city().invalid()) {
          <mat-error>{{ f.address.city().errors()[0].message }}</mat-error>
        }
      </mat-form-field>

      <button mat-button type="button" [disabled]="f().invalid()">Submit</button>
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
export default class ConditionalSchema {
  model = signal<Person>({
    name: {
      firstName: '',
      lastName: ''
    },
    address: {
      street: '',
      city: ''
    },
    canReceiveNewspaper: false
  });
  f = form(this.model, p => {
    apply(p.name, nameSchema);
    applyWhen(p.address, ({ valueOf }) => valueOf(p.canReceiveNewspaper), addressSchema);
  });
}
