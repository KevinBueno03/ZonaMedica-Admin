export interface PacienteRespones{
  "session_code"?: string;
}

export interface Paciente{
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  hn_id: string;
  email: string;
  files: string;

}

export interface PacienteInfo{
  _id:any;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  hn_id:string;
  email: string;
  department: string;
  img:string;
  files: string;
}

export interface ListaPacientes{
  active: boolean;
  firstName: string;
  firstLastName: string;
  secondLastName: string;
  hn_id:string;
  email: string;
  img:string;
  files:string;
}

