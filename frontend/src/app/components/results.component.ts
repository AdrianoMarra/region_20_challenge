import { Component } from '@angular/core';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-results',
  template: `

  <h5 class="mx-5 mt-4">{{total}} students matching your search </h5>

  <div class="loading" *ngIf="isLoading">
    <div class="spinner-border-wrapper">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
        <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

  <div class="row mx-5 my-4" *ngIf="results">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4"  *ngFor="let user of results">
          <app-card [student]=user></app-card>
      </div>
  </div>

  <div class="pagination justify-content-center" *ngIf="results">
    <ngb-pagination [pageSize]=6 [rotate]=true
      [collectionSize]=results.total_elements [(page)]=results.current_page
      aria-label="Default pagination" (pageChange)="onPageChange($event)">
    </ngb-pagination>
  </div>
`,
  styles: [`
  h3, h5 {
    font-weight: 300;
  }
  .loading {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-align: center;
  }
  .spinner-border-wrapper {
    margin: 0;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) }
  }`]
})
export class ResultsComponent {
  results: any;
  total: number;
  isLoading: any;

  constructor(private studentService: StudentsService) {
    this.studentService.resultsObservable.subscribe(value => {
      this.results = value;
      this.total = this.results.length;
    });

    this.studentService.loaddingObservable.subscribe(value => {
      this.isLoading = value;
    });
  }

  private onPageChange = (pageNumber) => {
    this.studentService.emitPage(pageNumber);
  }
}
