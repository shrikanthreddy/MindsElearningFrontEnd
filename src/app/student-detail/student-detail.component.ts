import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../student';
import { StudentService }  from '../service/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})

export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  
  constructor(
	  private route: ActivatedRoute,
	  private studentService: StudentService,
	  private location: Location
	) {}

  ngOnInit() {
  	this.getStudent();
  }

	getStudent(): void {
    const sdId = +this.route.snapshot.paramMap.get('sdId');
    this.studentService.getStudent(sdId)
      .subscribe(student => this.student = student);
  }

	goBack(): void {
	  this.location.back();
	}

  save(): void {
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }

}
