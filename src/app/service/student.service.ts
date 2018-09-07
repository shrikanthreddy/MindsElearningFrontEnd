import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../student';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './messages/message.service';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {
  private studentsUrl = 'https://localhost:8080/rest/student/students/';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getStudents (): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        catchError(this.handleError('getStudents', []))
      );
  }
 
  
 
  /** GET hero by id. Will 404 if id not found */
  getStudent(sdId: String): Observable<Student> {
    const url = `${this.studentsUrl}/${sdId}`;
    return this.http.get<Student>(url).pipe(
      tap(h => {}),
      catchError(this.handleError<Student>(`getStudent sdId=${sdId}`))
    );
  }
 
  /* GET heroes whose name contains search term */
  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Student[]>(`api/students/?name=${term}`).pipe(
      tap(h => {}),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new hero to the server */
  addStudents (student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
      tap((student: Student) => this.log(`Employee has been added successfully!`)),
      catchError(this.handleError<Student>('addStudents'))
    );
  }
 
  /** DELETE: delete the hero from the server */
  deleteStudents (student: Student | number): Observable<Student> {
    const sdId = typeof student === 'number' ? student : student.sdId;
    const url = `${this.studentsUrl}/${sdId}`;
 
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`Employee has been removed successfully!`)),
      catchError(this.handleError<Student>('deleteStudents'))
    );
  }
 
  /** PUT: update the hero on the server */
  updateStudent (student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, httpOptions).pipe(
      tap(_ => this.log(`Employee ha been updated successfully!`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageService.clear();
    this.messageService.add(message);
  }

}
