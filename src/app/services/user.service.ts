import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }


  registrarPaciente(body:any){
  
    return this._http.post('http://127.0.0.1:4300/api/register-patient',body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
    
  }


  registrarDoctores(body:any){
    return this._http.post('http://127.0.0.1:4300/api/register-doctor',body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }


}
