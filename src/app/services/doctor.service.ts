import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoctorRespones, Doctor, ListaDoctores, DoctorInfo, DoctorToken, Estado } from '../interfaces/doctor.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apibaseUrl: string = environment.APIBASEURL;
  private _doctor!: Doctor;
  private listaDoctores: ListaDoctores[]=[];
  private doctoresSubject = new Subject<ListaDoctores[]>();
  @Output() disparadordeInfoDoctor: EventEmitter<any>= new EventEmitter();

  constructor(private http: HttpClient) { }

  public subirDoctor(body:any): Observable<any>{
    const url = `${this.apibaseUrl}/doctors/${localStorage.getItem('token')}`;
    //const headers = new HttpHeaders()
      //.set('x-access-token', localStorage.getItem('token') || '');
    return this.http.put<any>(url,body);
  }

  updateAccepted(email:string, body:any): Observable<any>{
    const url = `${this.apibaseUrl}/doctors/${email}/email`;
    return this.http.put<any>(url, body);
  }

  get doctor() {
    return { ...this._doctor };
  }

  loginDoctor(email: string, password: string) {
    const url = `${this.apibaseUrl}/login?type=doctors`;
    const body = { email, password };

    //Para que reorne el observable; el objeto. Con los mensajes exitoso o no
    return this.http.post<DoctorRespones>(url, body)
      .pipe(
        tap(resp => {
          if (resp.session_code) {
            localStorage.setItem('token', resp.session_code!);
          }
        }),
        map(resp => true),
        catchError(err => of(false))
      )
  }

  getDoctor(): Observable<DoctorInfo[]>{
    const url = `${this.apibaseUrl}/doctors/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<DoctorInfo[]>(url, { headers });
  }

  getDoctorCitas(idDoctor:any): Observable<any>{
    const url = `${this.apibaseUrl}/med-appointment/doctor/${idDoctor}`;
    return this.http.get<any>(url);
  }

  getDoctorToken(): Observable<any>{
    const url = `${this.apibaseUrl}/doctor/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<any>(url, { headers });
  }

  getOneDoctor():Observable<any>{
    const url = `${this.apibaseUrl}/doctors/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<any>(url, { headers });
  }

  getDoctorById(idDoctor:any):Observable<DoctorInfo[]>{
    const url = `${this.apibaseUrl}/doctor/${idDoctor}`;
    return this.http.get<DoctorInfo[]>(url, {});
  }

  getDoctoresEspecialidades(especialidad:any): Observable<any>{
    const url = `${this.apibaseUrl}/doctors/master-degree/${especialidad}`;
    return this.http.get<any>(url);
  }


  getEstado() : Observable<any>{
    const url = `${this.apibaseUrl}/doctors/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<Estado[]>(url, { headers });

  }

  getMedAppointment(idDoctor:any): Observable<any>{
    const url = `${this.apibaseUrl}/med-appointment/doctor/${idDoctor}`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<any>(url, { headers });
  }


  restablecerContra(body:any){
    return this.http.post(`${this.apibaseUrl}/reset/password?type=doctors`,body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getDoctores(){
    return this.http.get(this.apibaseUrl + '/doctors');
  }

  getAcceptedDoctores(): Observable<any>{
    return this.http.get<any>(this.apibaseUrl + '/doctors');
  }

  getDoctoresAceptados(): Observable<any>{
    return this.http.get<any>(this.apibaseUrl + '/doctors/accepted');
  }

  validarTokenDoctor() {
    const url = `${this.apibaseUrl}/auth`;
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get(url, { headers });
  }

  onSesion(){
    return localStorage!=null;
  }

  logoutDoctor() {
    localStorage.clear();
  }

  registrarDoctores(body: any): Observable<any> {
    return this.http.post(`${this.apibaseUrl}/register-doctor`, body, {
      observe: "body",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  crearDireccion(body: any) {
    return this.http.post(`${this.apibaseUrl}/doctors/direction`, body, {
      observe: "body",
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '').append('Content-Type', 'application/json')
    });
  }

  obtenerDoctores(){
    this.http.get<ListaDoctores[]>(this.apibaseUrl + '/doctors')
    .subscribe((data)=>{
      this.listaDoctores=data;
      this.doctoresSubject.next([...this.listaDoctores]);
    });
  }

  obtenerActualListener(): Observable<any>{
    return this.doctoresSubject.asObservable();
  }

  cambiarSolicitud(body: any){
    return this.http.put(`${this.apibaseUrl}/doctor/acceptance`, body, {
      observe: "body",
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '').append('Content-Type', 'application/json')
    });
  }

  cambiarEstado(body: any){
    return this.http.put(`${this.apibaseUrl}/doctor/active`, body, {
      observe: "body",
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '').append('Content-Type', 'application/json')
    });
  }

}
