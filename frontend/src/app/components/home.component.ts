import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <app-search></app-search>
  <app-results></app-results>
  `
})
export class HomeComponent {
}
