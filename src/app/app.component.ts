import { Component } from '@angular/core';
import { HeroService } from './service/hero.service';
import { StudentService } from './service/student.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular4 Sample App';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/rest/student/student/4').subscribe(data => {
      console.log(data);
    });
  }

}
