import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError,map,tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { AdminResponse, Admin, AdminInfo } from 'src/app/interfaces/admin.interfaces';
import { DoctorInfo } from 'src/app/interfaces/doctor.interfaces';




@Injectable({
    providedIn:'root'
}) export class ServiceAdmin {
    
    
  private apibaseUrl: string= environment.APIBASEURL;
  private _admin!: Admin;

  get admin(){
    return {...this._admin};
  }
  constructor(private http: HttpClient) { }


  loginAdmin(email: string, password:string){
    const url= `${this.apibaseUrl}/login?type=admin`;
    const body= { email,password};

    //Para que reorne el observable; el objeto. Con los mensajes exitoso o no
    return this.http.post<AdminResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.session_code){
          localStorage.setItem('token', resp.session_code!);
        }
      }),
      map( resp=> true),
      catchError( err => of(false))
    )
  }


  validarTokenAdmin(){
    const url =`${this.apibaseUrl}/auth`;
    const headers= new HttpHeaders()
    .set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get(url,{headers});
  }

  onSesion(){
    return localStorage!=null;
  }

  logoutAdmin(){
    localStorage.clear();
  }

  registrarAdmin(body:any){
    return this.http.post(`${this.apibaseUrl}/register-admin`,body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getAdmin(): Observable<AdminInfo[]>{
    const url = `${this.apibaseUrl}/admin/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<DoctorInfo[]>(url, { headers });
  }


   

} 
