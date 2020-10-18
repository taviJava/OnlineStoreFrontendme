import {Privilege} from './privilege';
import {User} from '../../users/model/user';

export class Role {
  id: number;
  name: string;
  privileges: Privilege[];
  users: User[];

}
