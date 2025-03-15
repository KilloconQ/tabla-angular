import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule],
  templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent {
  fb = inject(FormBuilder);
  displayedColumns = ['caracter', 'value'];
  rows = signal<FormGroup[]>([this.createRow()]);

  headerForm = this.fb.group({ titleValue: this.fb.control('') });

  getFormControl(
    row: FormGroup<RowForm>,
    controlName: keyof RowForm,
  ): FormControl {
    return row.get(controlName) as FormControl;
  }

  createRow(): FormGroup<RowForm> {
    return this.fb.group({
      caracter: this.fb.control('', { nonNullable: true }),
      value: this.fb.control('', { nonNullable: true }),
    });
  }

  addRow() {
    this.rows.update((rows) => [...rows, this.createRow()]);
  }

  removeRow() {
    this.rows.update((rows) => {
      if (rows.length > 0) {
        rows.pop(); // 🔥 Elimina la última fila
      }
      return [...rows]; // Retorna una nueva referencia para que Angular detecte el cambio
    });
  }

  show() {
    const rowValues = this.rows().map((row) => row.value);
    console.log('rows', rowValues);
    console.log('header', this.headerForm.value);
  }
}

interface RowForm {
  caracter: FormControl<string>;
  value: FormControl<string>;
}

interface HeaderForm {
  titleValue: FormControl<string>;
}
