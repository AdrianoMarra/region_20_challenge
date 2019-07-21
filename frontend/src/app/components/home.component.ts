import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <app-search></app-search>
  <div class="dropdown-divider"></div>
  <app-results></app-results>
  `
})
export class HomeComponent {
}
