import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'student-card',
  template: `
    <div class="card mb-3">
      <div class="row no-gutters">
          <div class="col-md-4  pb-4">
            <img class="avatar rounded-circle" [src]="userImage" alt="Bologna" style="max-height: 100px;">
          </div>

          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title" >{{student.name}}</h5>
            <h6 class="card-subtitle mb-1 text-muted ml-2">ID: {{student.studentId}} </h6>
              <p class="card-text mb-0 ml-2">
                <strong>Campus:</strong> {{student.campus}}
              </p>
              <p class="card-text mb-0 ml-2">
                <strong>School year:</strong> {{student.schoolYear}}
              </p>
              <p class="card-text mb-0 ml-2">
                <strong>Entry date:</strong> {{student.entryDate}}
              </p>
              <p class="card-text mb-0 ml-2">
                <strong>Grade level:</strong> {{ student.gradeLevel }}
              </p>
            </div>
          </div>
      </div>
  </div>
`,
styles: [`
  h4, .text-muted {
    font-weight: 300;
  }
  h6 {
    font-size: 20px;
    font-weight: 300;
  }
  .avatar {
    border: 0.3rem solid rgba(#fff, 0.3);
    margin-bottom: 1rem;
    max-width: 9rem;
    margin-top: 1.5rem;
    margin-left: 2rem;
  }
  .card {
    box-shadow: 5px 5px #b3d7ff4f;
  }
  .more {
    display: inline;
    margin-left: 3rem;
  }
  .btn-outline-info {
    color: #007bff;
    border-color: #007bff;
    8: ;
  }
  .card-title{
    color: #007bff;
  }
  .show>.btn-outline-info.dropdown-toggle {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  .btn-outline-info:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  `],
  providers: [NgbModalConfig, NgbModal]
})

export class CardComponent {
    @Input() student: any;
    
    public isCollapsed = false;
    userImage = './assets/images/user_default_icon.png';

    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }
}
