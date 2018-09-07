import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from  '../service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentComponent implements OnInit {
  students: Student[];
  selectedStudent: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  getStudent(sdID:String): void {
    const sdId = +this.route.snapshot.paramMap.get('sdID');
    this.studentService.getStudent(sdId)
      .subscribe(student => this.student = student);
  }



  add(sdId: String): void 
  {
    sdId = sdId.trim();
    if (!sdId) { return; }
    this.studentService.addStudents({sdId} as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }
 
  delete(student: Student): void {
    this.students = this.students.filter(h => h !== student);
    this.studentService.deleteStudents(student).subscribe();
  }
}
