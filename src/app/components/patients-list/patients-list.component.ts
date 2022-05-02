import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListaPacientes } from 'src/app/interfaces/paciente.interfaces';
import { PacienteService } from 'src/app/services/paciente.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

   isChecked = true;

  pacientesData: ListaPacientes[] = [];
  desplegarColumnas = ["firstName", "firstLastName","secondLastName", "hn_id", "email", "estado", "archivo"];
  dataSource = new MatTableDataSource<ListaPacientes>();

  @ViewChild(MatSort)
  ordenamiento!: MatSort;

  @ViewChild(MatPaginator)
  paginacion !: MatPaginator;

  closeResult = '';
  reactiveForm: FormGroup;

  hideP = true;
  isVisible: any;
  isSelected: boolean = true;
  submittedPaciente: boolean = false;
  hide = true;
  hideC = true;
  active!:boolean;
  body={};
  myActive:any;

  constructor(private pacientesService: PacienteService, private formBuilder: FormBuilder, private _router: Router, private modalService: NgbModal) {
    this.reactiveForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      emailPaciente: new FormControl('', [Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('', Validators.required),
      passwordPaciente: new FormControl('', Validators.required),
      confirmPasswordPaciente: new FormControl('', Validators.required),
    }, {
      validators: this.MustMatch('passwordPaciente', 'confirmPasswordPaciente')
    });

    //console.log(this.pacientesData);
  }




  get formularioPaciente() {
    return this.reactiveForm.controls;
  }

  cambiarActive(email:string, active:boolean, nombre:string, apellido:string){
    if(active===true){

      this.myActive=false;
      this.body={active: this.myActive};
      console.log("tiempo");
      this.pacientesService.updateDato(email,this.body).subscribe(res=>{
        console.log("Esto le envia: ",email,this.body);
        console.log("Respuesta: ",res);
        if(res){
          Swal.fire('Cambio estado paciente', 'El paciente '+nombre+' '+apellido+'está desactivado ahora', 'info');
        }else{
          //mostrar mensaje de error
          this.sweetAlertLoginError();
        }
      });

      //this._router.navigateByUrl('/admin/listar-doctores');
    }else if(active===false){
     // active=true;
      this.myActive=true;
      this.body={active: this.myActive};

      this.pacientesService.updateDato(email,this.body).subscribe(res=>{
        console.log("Respuesta: ",res);
        console.log("Esto le envia: ",email,this.body);
        if(res){
          Swal.fire('Cambio estado paciente', 'El paciente está activado ahora', 'info');
        }else{
          //mostrar mensaje de error
          this.sweetAlertLoginError();
        }
      });
      //this._router.navigateByUrl('/admin/listar-doctores');
    }
    //this.body={active: active};

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  registrarPaciente() {
    if (!this.reactiveForm.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this.pacientesService.registrarPaciente(JSON.stringify(this.reactiveForm.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/']); this.sweetAlertRegistroSuccess() },
        error => { console.log(error); this.sweetAlertRegistroError() }
      )
    console.log(JSON.stringify(this.reactiveForm.value));
  }

  onSubmit() {
    this.submittedPaciente = true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }

  //INICIO FUNCIONES PARA MODALES

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //FIN MODALES

  //INICIO ALERTAS

  sweetAlertRegistroSuccess() {
    Swal.fire('¡Muy Bien!', 'Te has registrado satisfactoriamente', 'success');
  }

  sweetAlertRegistroError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

  sweetAlertLoginSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertLoginError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }


  hacerFiltro(filtro: string) {
    this.dataSource.filter = filtro;
  }

  ngOnInit(): void {
    this.pacientesService.obtenerPacientes();
    this.pacientesService.obtenerActualListener()
      .subscribe((pacientes: ListaPacientes[]) => {
        this.dataSource.data = pacientes;
      });

      console.log(this.dataSource.data);
      console.log(this.pacientesData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }



}
