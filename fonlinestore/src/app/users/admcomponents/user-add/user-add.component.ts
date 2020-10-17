import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Address} from '../../model/address';
import {HttpEventType, HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: User = new User();
  myGroup: FormGroup;
  address: Address;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.address = new Address();
    this.myGroup = new FormGroup({
      email: new FormControl(),
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
    this.address.street = this.myGroup.get('street').value;
    this.address.city = this.myGroup.get('city').value;
    this.address.zipCode = this.myGroup.get('zipcode').value;
    this.address.country = this.myGroup.get('country').value;
    this.user.adress = this.address;
    this.userService.save(this.user).subscribe(result => {
    });
    this.upload();
    setTimeout(() =>
      {
        this.router.navigate(['users']);
      },
      5000);
  }
  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.userService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          const  a = event.body.id;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
}
