import { Component, Input} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  template: `
    <div class="card mb-3">
      <div class="row no-gutters">
          <div class="col-12">
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
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 20px;
    font-weight: 300;
  }
  .card {
    box-shadow: 5px 5px #b3d7ff4f;
  }
  .card-title {
    color: #007bff;
  }
  .card-subtitle {
    font-size: 18px;
  }
  .card-body {
    padding: 1.2rem;
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
