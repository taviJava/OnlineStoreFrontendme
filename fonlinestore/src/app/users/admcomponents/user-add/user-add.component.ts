import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AddressService} from '../../service/address.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Address} from '../../model/address';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: User = new User();
  myGroup: FormGroup;
  address: Address;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.address = new Address();
    this.myGroup = new FormGroup({
      email: new FormControl(),
      url: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl()
    });
  }

  // tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['users']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.user.email = this.myGroup.get('email').value;
    this.user.url = this.myGroup.get('url').value;
    this.address.street = this.myGroup.get('street').value;
    this.address.city = this.myGroup.get('city').value;
    this.address.zipCode = this.myGroup.get('zipcode').value;
    this.address.country = this.myGroup.get('country').value;
    this.user.adress = this.address;
    this.userService.save(this.user).subscribe(result => this.getAll());
  }

}
