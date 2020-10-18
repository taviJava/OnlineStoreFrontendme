import {Address} from './address';
import {Observable} from 'rxjs';
import {Role} from '../../security/model/role';

export class User {
  id: number;
  password: string;
  newPassword: string;
  email: string;
  adress: Address;
  roleList: Role[];
  photo: Observable<any>;


}
