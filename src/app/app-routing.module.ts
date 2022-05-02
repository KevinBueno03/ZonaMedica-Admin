import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

//seguridad
import { AdminSeguridadRouter} from "src/app/adminSeguridad.router";
const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
   { path: 'admin/listar-pacientes', component:PatientsListComponent , canActivate: [AdminSeguridadRouter]},
  { path: 'admin/listar-doctores', component: DoctorsListComponent, canActivate: [AdminSeguridadRouter]},
 



];




@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})], 
  exports: [RouterModule],
  providers :[AdminSeguridadRouter]
})
export class AppRoutingModule { }


