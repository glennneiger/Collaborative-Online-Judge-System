import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../data-structure/problem';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  currentPageProblems: Problem[] = [];
  deleteProblemIndex: number;
  difficulties: string[] = ['All', 'Easy', 'Medium', 'Hard', 'Super'];

  // MdPaginator Inputs
  pageIndex: number = 0;
  pageSize: number = 5;
  pageLength: number = 10;
  pageSizeOptions = [5, 10, 25, 100];
 

  constructor( @Inject('data') private dataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems() {
    this.dataService.getProblems()
      .subscribe((problems: Problem[]) => { 
        this.problems = problems;
        this.sortProblems(this.problems);
        const pageStartIndex = this.pageIndex * this.pageSize;
        const pageEndIndex = pageStartIndex + this.pageSize;
        this.currentPageProblems = this.problems.slice(pageStartIndex, pageEndIndex);
      });
  }

  deleteProblem(index: number) {
    const deleteProblemIndex = this.pageIndex * this.pageSize + index;
    this.dataService.deleteProblem(this.problems[deleteProblemIndex])
      .catch(error => console.log(error));
  }

  setDeleteProblemIndex(index: number) {
    this.deleteProblemIndex = index;
  }

  changePage(page) {
    const pageStartIndex = page.pageIndex * page.pageSize;
    const pageEndIndex = pageStartIndex + page.pageSize;
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    this.currentPageProblems = this.problems.slice(pageStartIndex, pageEndIndex);
  }

  sortProblems(problems): Problem[] {
    let sortedProblems = problems;
    sortedProblems.sort(this.compareProblemById);
    return sortedProblems;
  }

  compareProblemById(problem_a, problem_b) {
    return problem_a.id && problem_b.id ? problem_a.id - problem_b.id : 0;
  }
  
}
