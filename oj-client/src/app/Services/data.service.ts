import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Problem } from '../data-structure/problem';
import { PROBLEMS } from '../mock-problem';

@Injectable()
export class DataService {
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    // return this.problems;
    this.http.get('api/v1/problems')
            .toPromise()
            .then((res: Response) => {
              this._problemSource.next(res.json());
            })
            .catch(this.handleError);
    return this._problemSource.asObservable();            
  }

  getProblem(id: number) {
    this.http.get(`api/v1/problems/${id}`)
          .toPromise()
          .then((res: Response) => {
            return res.json();
          })
          .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers});
    return this.http.post('api/v1/problems', problem, options)
                  .toPromise()
                  .then((res: Response) => {
                    this.getProblems();
                    return res.json();
                  })
                  .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error);
  }

}
