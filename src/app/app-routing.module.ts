import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { StudentComponent }  from './student/students.component';
import { StudentDetailComponent }  from './student-detail/student-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'employee/:id', component: HeroDetailComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'heroes', component: HeroesComponent },
	{ path: 'students', component: StudentComponent },
	{ path: 'student/:sdId', component:StudentDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 
	
}