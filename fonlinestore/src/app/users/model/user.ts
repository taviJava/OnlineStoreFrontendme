import {Address} from './address';
import {Observable} from 'rxjs';

export class User {
  id: number;
  email: string;
  adress: Address;
  photo: Observable<any>;


}
