import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { StudentsService } from '../services/students.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
selector: 'app-search',
template: `
    <h1 class="mx-5 mt-4 mb-3">Students search applicaton </h1>

    <div class="px-5">
        <form class="needs-validation" [formGroup]="myForm">
            <div class="form-row">
                <div class="col-md-9 mb-3">
                    <label for="validationCustomUsername">Student Name</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                        <input class="form-control" type="search" placeholder="Type student first or last name" aria-label="Search" [formControl]="myForm.get('name')">
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="studentId">Student ID</label>
                    <input type="text" class="form-control" id="studentId" placeholder="Type an ID" [formControl]="myForm.get('studentId')">
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">Campus</label>
                    <input type="text" class="form-control" id="campus" placeholder="Type a campus code" [formControl]="myForm.get('campus')">
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom03">Grade Level</label>
                    <div class="w-100">
                        <select formControlName="gradeLevel" (change)="gradeLevelOnChange($event.target.value)">
                            <option *ngFor="let gl of gradeLevels" [ngValue]="gl" [selected]="gradeLevels">{{gl}}</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3 mb-3">
                    <label for="validationCustom02">School Year</label>
                    <div ngbDropdown class="d-inline-block w-100">
                        <select formControlName="schoolYear" (change)="schoolYearOnChange($event.target.value)">
                            <option *ngFor="let sy of schoolYears" [ngValue]="sy" [selected]="schoolYears">{{sy}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="validationCustom05">Entry Date</label>
                    <input type="text" class="form-control" placeholder="Entry date" [formControl]="myForm.get('name')">
                </div>
            </div>
            <button type="button" (click)="clearForm()" (click)="updateSearch()"  value="Reset">Reset</button>
        </form>
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
`]
})
export class SearchComponent implements OnInit {
    @Output() resultsChange = new EventEmitter();
    private gradeLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 'All'];
    private schoolYears = [2017, 2018, 2019, 'All'];
    myForm: FormGroup;

    constructor(private studentService: StudentsService,
                private formBuilder: FormBuilder,
                private myElement: ElementRef) {

            this.clearForm();
    }

    ngOnInit() {
        this.updateSearch();
        this.onKeyUpEvent();
      }

      clearForm() {
        this.myForm = this.formBuilder.group({
            name: [''],
            studentId: [''],
            campus: [''],
            gradeLevel: new FormControl(null),
            schoolYear: new FormControl(null)
          });
      }

    gradeLevelOnChange(val) {
        this.updateSearch();
    }

    schoolYearOnChange(val) {
        this.updateSearch();
    }

    onKeyUpEvent() {
        fromEvent(this.myElement.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {
              this.studentService.emitLoadding(true);
              return event.target.value;
            })
            // Time in milliseconds between key events
            , debounceTime(1000)
            // If previous query is diffent from current
            , distinctUntilChanged()
            // subscription for response
            ).subscribe(() => {
                this.updateSearch();
            });
    }

    updateSearch() {
        const query = { ...this.myForm.value };

        for (const prop in query) {
            if (!query[prop] || query[prop] === 'All') {
                delete query[prop];
            }
        }

        this.studentService.search(query).subscribe((res: any) => {
            this.studentService.emitResults(res);
            this.studentService.emitLoadding(false);
        }, (err) => {
            console.log('error', err);
        });
    }
}
