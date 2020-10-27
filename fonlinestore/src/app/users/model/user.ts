import {Address} from './address';
import {Observable} from 'rxjs';


export class User {
  id: number;
  password: string;
  newPassword: string;
  email: string;
  fullName: string;
  phone: string;
  idPhoto: string;
  adress: Address;
  role: string;
  photo: Observable<any>;


}
