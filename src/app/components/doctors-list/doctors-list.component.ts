import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListaDoctores } from 'src/app/interfaces/doctor.interfaces';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  pacientesData: ListaDoctores[] = [];
  desplegarColumnas=["firstName","firstLastName","hn_id","phone","estado","accepted", "archivo"];
  dataSource = new MatTableDataSource<ListaDoctores>();
  closeResult = '';
  registrarDoctor: FormGroup;
  //formLoginDoctor: FormGroup;
  hideP=true;
  isVisible: any;
  isSelected: boolean = true;
  public isCollapsedD = true;
  public isCollapsedP = true;
  submittedPaciente: boolean=false;
  submitted: boolean = false;
  hide=true;
  hideC=true;
  accepted!: boolean;
  active!:boolean;
  body={};
  myActive:any;
  myAccepted:any;

  //safeUrl=this.pacientesData;

  @ViewChild(MatSort)
  ordenamiento!: MatSort;

  @ViewChild(MatPaginator)
  paginacion !: MatPaginator;

  @ViewChild('tablita') tablita!: MatTable<any>;

  constructor(private doctorsService: DoctorService, private formBuilder: FormBuilder, private _router: Router,private modalService: NgbModal, private sanitizer: DomSanitizer) {
    //sanitizer.bypassSecurityTrustResourceUrl(this.safeUrl);

    this.registrarDoctor = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('',Validators.required),
      medAppointment_modality_inHouse: new FormControl(''),
      medAppointment_modality_inClinic: new FormControl(''),
      medAppointment_modality_online: new FormControl(''),
      master_degree: new FormControl(''),
      bibliography: new FormControl('')

    });
   }

  hacerFiltro(filtro: string){
    this.dataSource.filter= filtro;
  }


  get formularioDoctor() {
    return this.registrarDoctor.controls;
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


  registrarDoctores() {
    if (!this.registrarDoctor.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this.doctorsService.registrarDoctores(JSON.stringify(this.registrarDoctor.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/admin/listar-doctores']); this.sweetAlertRegistroSuccess() },
        error => {console.log(error); this.sweetAlertRegistroError()}
      )
    console.log(JSON.stringify(this.registrarDoctor.value));
  }

  onSubmit() {
    this.submittedPaciente=true;
    if (this.registrarDoctor.invalid) {
      return;
    }
  }


  cambiarActiveDoctor(email:string, active:boolean, nombre:string, apellido:string){
    if(active===true){

      this.myActive=false;
      this.body={active: this.myActive};
      console.log("tiempo");
      this.doctorsService.updateAccepted(email,this.body).subscribe(res=>{
        console.log("Esto le envia: ",email,this.body);
        console.log("Respuesta: ",res);
        if(res){
          Swal.fire('Cambio estado doctor', 'El doctor '+nombre+' '+apellido+' está desactivado ahora', 'info');
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

      this.doctorsService.updateAccepted(email,this.body).subscribe(res=>{
        console.log("Respuesta: ",res);
        console.log("Esto le envia: ",email,this.body);
        if(res){
          Swal.fire('Cambio estado doctor',  'El doctor '+nombre+' '+apellido+' está activado ahora', 'info');
        }else{
          //mostrar mensaje de error
          this.sweetAlertLoginError();
        }
      });
      //this._router.navigateByUrl('/admin/listar-doctores');
    }
    //this.body={active: active};

  }



  cambiarAcceptedDoctor(email:string, accepted:boolean, nombre:string, apellido:string){
    if(accepted===true){

      this.myAccepted=false;
      this.body={accepted: this.myAccepted};
      console.log("tiempo");
      this.doctorsService.updateAccepted(email,this.body).subscribe(res=>{
        console.log("Esto le envia: ",email,this.body);
        console.log("Respuesta: ",res);
        if(res){
          Swal.fire('Cambio aceptacion doctor', 'El doctor '+nombre+' '+apellido+' está declinado', 'info');
        }else{
          //mostrar mensaje de error
          this.sweetAlertLoginError();
        }
      });

      //this._router.navigateByUrl('/admin/listar-doctores');
    }else if(accepted===false){
     // active=true;
      this.myAccepted=true;
      this.body={accepted: this.myAccepted};

      this.doctorsService.updateAccepted(email,this.body).subscribe(res=>{
        if(res){
          Swal.fire('Cambio aceptación doctor',  'El doctor '+nombre+' '+apellido+' está aceptado', 'info');
        }else{
          this.sweetAlertLoginError();
        }
      });
      //this._router.navigateByUrl('/admin/listar-doctores');
    }
    //this.body={active: active};

  }


  //INICIO FUNCIONES PARA MODALES

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    Swal.fire('¡Upps!', 'No ha podido actualizar.', 'error');
  }


  //FIN ALERTAS


  ngOnInit(): void {
    this.doctorsService.obtenerDoctores();
    this.doctorsService.obtenerActualListener()
      .subscribe((doctores: ListaDoctores[]) => {
        this.dataSource.data = doctores;
      });
  }

  ngAfterViewInit(){
    this.dataSource.sort= this.ordenamiento;
    this.dataSource.paginator= this.paginacion;
  }



}
