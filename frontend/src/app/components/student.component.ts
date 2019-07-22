import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../services/students.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getParseErrors } from '@angular/compiler';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  template: `
  <div class="container">
  <ngb-alert *ngIf="successMessage" type="success" (close)="successMessage = null" style="position: fixed; width:90%; top: 10px;">{{ successMessage }}</ngb-alert>
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
        <form [formGroup]="myForm" (ngSubmit)="submitStudentForm()" class="row">
          <div class="form-group col-4">
            <label>Name:</label>
            <input type="text" class="form-control" name="name"
            [formControl]="myForm.get('name')" [value]="myForm.value.name" placeholder="full name" required>
          </div>

          <div class="form-group col-4">
            <label>Student ID:</label>
            <input type="text" class="form-control" name="studentId"
              [formControl]="myForm.get('studentId')" [value]="myForm.value.studentId" placeholder = "6 digits" required>
          </div>

          <div class="form-group col-4">
            <label>Campus:</label>
            <input type="text" class="form-control" name="campus"
              [formControl]="myForm.get('campus')" [value]="myForm.value.campus" placeholder = "campus code" required>
          </div>

          <div class="form-group col-4">
            <label>School Year:</label>
              <select formControlName="schoolYear">
              <option *ngFor="let sy of schoolYears" [ngValue]="sy">{{sy}}</option>
          </select>
          </div>

          <div class="form-group col-4">
            <label>Grade Level:</label>
            <select formControlName="gradeLevel">
              <option *ngFor="let gl of gradeLevels" [ngValue]="gl">{{gl}}</option>
            </select>
          </div>

          <div class="form-group col-4">
            <label>Entry Date:</label>
            <input type="date" class="form-control" [formControl]="myForm.get('entryDate')"/>
          </div>

          <div class="form-group">
            <input type="hidden" class="form-control" name="id" [formControl]="myForm.get('id')" [value]="myForm.value.id" required>
          </div>

          <div class="form-group col-12">
            <div *ngIf="errors.length > 0"
              class="alert alert-danger">
              <div *ngFor="let error of errors"> {{ error }} </div>
            </div>
          </div>

          <div class="form-group col-12">
            <button type="submit" class="btn btn-primary mr-3"> Save </button>
            <button type="button" class="btn btn-warning" (click)="modal.dismiss('Cancell click')"> Cancel </button>
          </div>
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
            <td>{{student.entryDate | date:'MM/dd/yyyy'}}</td>
            <td>
              <!--button class="btn btn-primary mr-3" (click)="editStudent(student.id)" (click)="open(content)">Edit</button-->
              <!--button class="btn btn-danger" (click)="deleteStudent(student.id)">Delete</button -->
              
              <span (click)="editStudent(student.id)" (click)="open(content)">
                <i class="fa fa-edit"></i>
              </span>
              <span (click)="deleteStudent(student.id)">
                <i class="fa fa-trash"></i>
              </span>
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
  .fa-edit {
    font-size: 26px;
    margin-right: 10px;
    color: #167bff;
    cursor: pointer;
    bottom: -2px;
    position: relative;
  }
  .fa-trash {
    font-size: 26px;
    color: #f33c3c;
    cursor: pointer;
    position: relative;
  }
  .fa-edit:hover {
    top: 0px;
  }
  .fa-trash:hover {
    top: -2px;
  }`]
})
export class StudentComponent implements OnInit {
  private myForm: FormGroup;
  private students: any;
  private errors: any;
  private schoolYears = [2017, 2018, 2019];
  private gradeLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  constructor(private fb: FormBuilder, private studentService: StudentsService, private modalService: NgbModal) {
    this.clearForm();
    this.getStudents();
    this.errors = [];
  }

  private _success = new Subject<string>();

  successMessage: string;

  ngOnInit(): void {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null);
  }

  public messageAdded(student) {
    this._success.next(`${student} was successfully created!`);
  }

  public messageUpdated(student) {
    this._success.next(`${student} was successfully updated!`);
  }

  public messageDeleted(student) {
    this._success.next(`${student} was successfully deleted!`);
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
    this.studentService.addStudent(this.myForm.value).subscribe((res: any) => {
      this.students.push(res);
      this.messageAdded(res.name);
      this.modalService.dismissAll();
    }, (err) => {
      this.displayErrors(err);
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.myForm.value).subscribe((res: any) => {
      this.students = this.removeStudent(this.students, res);
      this.students.push(res);
      this.messageUpdated(res.name);
      this.modalService.dismissAll();
    }, (err) => {
      this.displayErrors(err);
    });
  }

  editStudent(id) {
    const student = this.getStudent(this.students, id);
    this.myForm = this.fb.group({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      campus: student.campus,
      schoolYear: student.schoolYear,
      gradeLevel: student.gradeLevel,
      entryDate: student.entryDate
    });
  }

  deleteStudent(id) {
    this.studentService.deleteStudent(id).subscribe((res: any) => {
      this.students = this.removeStudent(this.students, res);
      this.messageDeleted(res.name);
    }, (err) => {
      console.log('error', err);
    });
  }

  removeStudent(arr, value) {
    return arr.filter((elem) => {
      return elem.id !== value.id;
    });
  }

  getStudent(arr, id) {
    return arr.filter((elem) => {
      return elem.id === id;
    })[0];
  }

  clearForm() {
    this.myForm = this.fb.group({
      id: '',
      name: '',
      studentId: '',
      campus: '',
      schoolYear: '',
      gradeLevel: '',
      entryDate: ''
    });
  }

  displayErrors(err) {
    this.errors = [];
    if (err.status === 500) {
      this.errors.push("*This student ID is already being used.");
    } else {
      err.error.errors.forEach(error => {
        this.errors.push(error.defaultMessage);
      });
    }
  }

  open(content) {
    this.errors = [];
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }
}
