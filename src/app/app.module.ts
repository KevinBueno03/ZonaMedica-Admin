import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


//material importations
import { MaterialModule } from './material.module';
//

//services
import { ServiceAdmin } from './services/admin-service.service';
import { DoctorService } from 'src/app/services/doctor.service';

//PIPES
import { ListaDoctoresPipe } from './components/doctors-list/lista-doctores.pipe';
import { ListaPacientesPipe } from 'src/app/components/patients-list/lista-pacientes.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    LoginComponent,
    AdminNavbarComponent,
    ListaDoctoresPipe,
    PatientsListComponent,
    ListaPacientesPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   



  ],
  providers: [ServiceAdmin, DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
