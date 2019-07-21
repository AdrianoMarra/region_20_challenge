import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `

  <nav class="navbar navbar-dark bg-primary mb-4">
  <a class="navbar-brand" [routerLink]="['/']">Region 20 Students Search</a>

  <div>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" [routerLink]="['students']">Manage Students</a>
      </li>
    </ul>
  </div>
</nav>
  `,
  styles: [`
    .nav-link {
      margin-left: 10px;
      padding: 8px;
      border: white solid 1px;
      border-radius: 5px;
  }`],
})
export class MenuComponent {}
