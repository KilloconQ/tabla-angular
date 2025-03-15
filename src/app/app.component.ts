import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-root',
  imports: [DynamicTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamic-table';
}
