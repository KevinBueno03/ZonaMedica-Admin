import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceAdmin } from 'src/app/services/admin-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLoginAdmin: FormGroup;
  recuperarContra: FormGroup;
  hideA=true;
  closeResult = '';
  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder, private _router: Router, private modalService: NgbModal, private adminService: ServiceAdmin) {
    this.formLoginAdmin = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });


    this.recuperarContra= this.formBuilder.group({
      emailRecu: new FormControl('', [Validators.required, Validators.email])
    });
  }
  submitted: boolean = false;
  get formAdminLogin() {
    return this.formLoginAdmin.controls;
  }

  get recuContra() {
    return this.recuperarContra.controls;
  }

rContraFallido() {
    Swal.fire('¡Ups!', 'Ocurrió un error al actualizar tu contraseña', 'error');
  }

  rContraexitoso() {
    Swal.fire('¡Listo!', 'Revisa tu correo y sigue los pasos para reestablecer tu contraseña', 'success');
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLoginAdmin.invalid) {
      return;
    }
  }


  logoutAdmin(){
    this._router.navigateByUrl('/doctor/login-doctor');
    this.adminService.logoutAdmin();
  }

  logAdmin(){
    console.log(this.formLoginAdmin.value);
    const {email, password}= this.formLoginAdmin.value;
    this.adminService.loginAdmin(email, password)
    .subscribe( resp =>{
      if(resp){
        this._router.navigateByUrl('/admin/listar-doctores');
      }else{
        //mostrar mensaje de error
        this.sweetAlertError();
      }
      //console.log(resp);
    });
    //this._router.navigateByUrl('/dashboard');
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

  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Revisa que tu correo y contraseña estén bien escritos', 'error');
  }


  olvidoContra() {
    Swal.fire('¡Lastima!', 'Ni modo wey, asi es la vida ):', 'error');
  }


  

}
