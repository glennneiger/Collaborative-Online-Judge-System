import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../data-structure/problem';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];

  constructor(@Inject('data') private dataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems() {
    this.dataService.getProblems()
    .subscribe((problems: Problem[]) => this.problems = problems);
  }

  deleteProblem(index: number) {
    this.dataService.deleteProblem(this.problems[index])        
        .catch(error => console.log(error));
  }

}
