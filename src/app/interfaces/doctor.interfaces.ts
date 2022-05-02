export interface DoctorRespones{
  "session_code"?: string;
}

export interface Doctor{
  firstName:string;
  firstLastName: string;
}

export interface ListaDoctores{
  active: boolean;
  firstName: string;
  firstLastName: string;
  hn_id:string;
  email: string;
  phone: string;
  accepted: boolean;
  img: string;
  file:string;
  onService: boolean;
  bibliography:string;
}

export interface DoctorInfo{
  _id:string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  hn_id:string;
  email: string;
  department: string;
  phone: string;
  master_degree:string;
  img:string;
  file:string;
  onService:boolean;
  accepted:boolean;
  active: boolean;
  bibliography:string;
}

export interface DoctorToken{
  _id:any;
}

export interface Estado{
  onService:boolean;
}

export interface MedAppointment{
  medAppointment_modality_inHouse:boolean;
  medAppointment_modality_inClinic:boolean;
  medAppointment_modality_online:boolean;
  payment_cash:boolean;
  payment_digital:boolean;
  date: Date;
  hour:number;
  minutes:number;
  description:string;
  id_patient:string;
}
