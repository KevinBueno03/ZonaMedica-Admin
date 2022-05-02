import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PacienteRespones, PacienteInfo, ListaPacientes, Paciente } from 'src/app/interfaces/paciente.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apibaseUrl: string = environment.APIBASEURL;
  private _user!: Paciente;
  private infoPaciente: PacienteInfo[] = [];
  private infoPacienteSubject = new Subject<PacienteInfo[]>();
  private listaPacientes: ListaPacientes[] = [];
  private pacientesSubject = new Subject<ListaPacientes[]>();


  public subir(body:any): Observable<any>{
    const url = `${this.apibaseUrl}/patients/${localStorage.getItem('token')}`;
    //const headers = new HttpHeaders()
      //.set('x-access-token', localStorage.getItem('token') || '');
    return this.http.put<any>(url,body);
  }

  get paciente() {
    return { ...this._user };
  }

  getMedAppointment(idUsuario:any): Observable<any>{
    const url = `${this.apibaseUrl}/med-appointment/patiente/${idUsuario}`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<any>(url, { headers });
  }

  getPacienteById(idPaciente:any):Observable<PacienteInfo[]>{
    const url = `${this.apibaseUrl}/patient/${idPaciente}`;
    return this.http.get<PacienteInfo[]>(url, {});
  }

  constructor(private http: HttpClient) { }


  loginPaciente(email: string, password: string) {
    const url = `${this.apibaseUrl}/login?type=patients`;
    const body = { email, password };

    //Para que reorne el observable; el objeto. Con los mensajes exitoso o no
    return this.http.post<PacienteRespones>(url, body)
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


  mostrarPaciente(data: string, token: string) {
    const url = `${this.apibaseUrl}/patients/data/get`;
    const body = { data, token };
    return this.http.post<PacienteInfo>(url, body)
      .pipe(
        tap(resp => {
          localStorage.setItem('firstName', resp.firstName!);
          localStorage.setItem('firstLastName', resp.firstName!)
        }),
        map(resp => true),
        catchError(err => of(false))
      )
  }


  getPaciente(): Observable<PacienteInfo[]>{
    const url = `${this.apibaseUrl}/patients/token`;
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<PacienteInfo[]>(url, { headers });
  }

  //El componente que obtiene la lista ejecuta el actual listener porque es el que devuelve la data
  obtenerActualListenerPaciente() {
    return this.infoPacienteSubject.asObservable();
  }


  obtenerPacientesInfo() {
    const url = `${this.apibaseUrl}/patients/token`;
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get<PacienteInfo[]>(url, { headers });
    //return this.listaPacientes.slice();
  }



  //El componente que obtiene la lista ejecuta el actual listener
  //porque es el que devuelve la data
  obtenerActualListener() {
    return this.pacientesSubject.asObservable();
  }


  obtenerPacientes() {
    this.http.get<ListaPacientes[]>(this.apibaseUrl + '/patients')
      .subscribe((data) => {
        this.listaPacientes = data;
        this.pacientesSubject.next([...this.listaPacientes]); //con el next va a refrescarse y obtener la nueva data del servidor
      });
  }

  validarToken() {
    const url = `${this.apibaseUrl}/auth`;
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get(url, { headers });
  }


  logoutPaciente() {
    localStorage.clear();
  }

  registrarPaciente(body: any): Observable<any>{
    return this.http.post(`${this.apibaseUrl}/register-patient`, body, {
      observe: "body",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  agendarCita(body: any) {
    return this.http.post(`${this.apibaseUrl}/med-appointment`, body, {
      observe: "body",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  enviarCorreo(body: any) {
    return this.http.post(`${this.apibaseUrl}/contactus`, body, {
      observe: "body",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  restablecerContra(body: any) {
    return this.http.post(`${this.apibaseUrl}/reset/password?type=patients`, body, {
      observe: "body",
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  updateDato(email:string, body:any): Observable<any>{
    console.log("hola entra pero no da")
    const url = `${this.apibaseUrl}/patients/${email}/email`;
    return this.http.put<any>(url, body,{ observe: "body"});
  }

  updateProducto(_id:string, body:any): Observable<any>{
    console.log("hola entra pero no da")
    const url = `${this.apibaseUrl}/patients/${_id}/email`;
    return this.http.put<any>(url, body,{ observe: "body"});
  }


  async updateDatos(email:string, body:any): Promise<any>{
    try{
    let data = await this.http.put(`${this.apibaseUrl}/patients/${email}/email`,body).toPromise();
    return data;
  }catch(err){
    console.log(err);
  }
  }
}
