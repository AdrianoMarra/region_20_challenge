import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentsService } from '../services/students.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'student',
  template: `

  <div class="container">

  <h1 class="d-inline-block">Manage students</h1>
  <button type="button" class="btn btn-primary float-right mt-2 mb-4" (click)="clearForm()" (click)="open(content)">New student</button>

    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Student</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form [formGroup]="myForm" (ngSubmit)="submitStudentForm()">
          <div class="form-group">
            <label for="job">Name:</label>
            <input type="text" class="form-control" name="name" [formControl]="myForm.get('name')" [value]="myForm.value.name" placeholder="full name" required>
          </div>

          <div class="form-group">
            <label for="job">Student ID:</label>
            <input type="text" class="form-control" name="studentId" [formControl]="myForm.get('studentId')" [value]="myForm.value.studentId" placeholder = "6 digits" required>
          </div>

          <div class="form-group">
            <label for="job">Campus:</label>
            <input type="text" class="form-control" name="campus" [formControl]="myForm.get('campus')" [value]="myForm.value.campus" placeholder = "campus code" required>
          </div>

          <div class="form-group">
            <label for="job">School Year:</label>
            <input type="number" class="form-control" name="schoolYear" [formControl]="myForm.get('schoolYear')" [value]="myForm.value.schoolYear" placeholder = "yyyy" required>
          </div>

          <div class="form-group">
            <label for="job">Grade Level:</label>
            <input type="number" class="form-control" name="gradeLevel" [formControl]="myForm.get('gradeLevel')" [value]="myForm.value.gradeLevel" required>
          </div>

          <div class="form-group">
            <label for="job">Entry Date:</label>
            <input type="text" class="form-control" name="entryDate" [formControl]="myForm.get('entryDate')" [value]="myForm.value.entryDate" placeholder = "yyyy-mm-dd" required>
          </div>

          <div class="form-group">
            <input type="hidden" class="form-control" name="id" [formControl]="myForm.get('id')" [value]="myForm.value.id" required>
          </div>

          <button type="submit" class="btn btn-primary"> Save </button>
        </form>
      </div>
    </ng-template>


    <table class="table table-striped">
      <thead class="grey lighten-1 black-text">
        <tr>
          <th>Student Id</th>
          <th>Name</th>
          <th>Campus</th>
          <th>School Year</th>
          <th>Grade Level</th>
          <th>Entry Date</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr mdbTableCol *ngFor="let student of students">
            <th scope="row">{{student.studentId}}</th>
            <td>{{student.name}}</td>
            <td>{{student.campus}}</td>
            <td>{{student.schoolYear}}</td>
            <td>{{student.gradeLevel}}</td>
            <td>{{student.entryDate}}</td>
            <td>
              <button class="btn btn-primary mr-3" id="remove" (click)="editStudent(student.id)" (click)="open(content)">Edit</button>
              <button class="btn btn-danger" id="remove" (click)="deleteStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
  `,
  styles: [`
    h1, h3, h5 {
      font-weight: 300;
    }
    h1 {
        font-size: 28px;
    }
    select {
      width: 100%;
      height: 37px;
      background: white;
      color: #495057;
      outline: none;
  }
  .close {
    outline: none;
  }
    `]
})
export class StudentComponent {
  myForm: FormGroup;
  students: any;

  constructor(private fb: FormBuilder, private studentService: StudentsService, private modalService: NgbModal) {
    this.clearForm();
    this.getStudents();
  }
  getStudents() {
    this.studentService.search({}).subscribe((res) => {
      this.students = res;
    }, (err) => {
      console.log('error', err);
    });
  }

  submitStudentForm() {
    if (!this.myForm.value.id) {
      this.addStudent();
    } else {
      this.updateStudent();
    }
  }

  addStudent() {
    this.studentService.addStudent(this.myForm.value).subscribe((res) => {
      this.students.push(res);
      this.modalService.dismissAll();
    }, (err) => {
      console.log('error', err);
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.myForm.value).subscribe((res) => {
      this.students = this.removeStudent(this.students, res);
      this.students.push(res);
      this.modalService.dismissAll();
    }, (err) => {
      console.log('error', err);
    });
  }

  editStudent(id) {
    this.studentService.getStudent(id).subscribe((res: any) => {
      this.myForm = this.fb.group({
        'id': res.id,
        'name': res.name,
        'studentId': res.studentId,
        'campus': res.campus,
        'schoolYear': res.schoolYear,
        'gradeLevel': res.gradeLevel,
        'entryDate': res.entryDate
      });

    }, (err) => {
      console.log('error', err);
    });
  }

  deleteStudent(id) {
    this.studentService.deleteStudent(id).subscribe((res) => {
      this.students = this.removeStudent(this.students, res);
      console.log(this.students);
    }, (err) => {
      console.log('error', err);
    });
  }

  removeStudent(arr, value) {
    return arr.filter((elem) => {
      return elem.id != value.id;
    });
  }

  clearForm() {
    this.myForm = this.fb.group({
      'id': '',
      'name': '',
      'studentId': '',
      'campus': '',
      'schoolYear': '',
      'gradeLevel': '',
      'entryDate': ''
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason);
      });
  }
}
