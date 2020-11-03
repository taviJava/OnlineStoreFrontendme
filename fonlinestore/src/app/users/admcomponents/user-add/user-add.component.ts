import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Address} from '../../model/address';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../../service/authentication.service';


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
  confirmPassword = '';
  password = '';
  isLoggedIn = false;
  currentUser: User;
  // preview photo
  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;
  users: User[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthenticationService) {
    this.currentUser = new User();
    this.currentUser.email = 'Please Log-in';
  }

  ngOnInit(): void {
    this.users = [];
    this.userService.findAll().subscribe( data => {
      this.users = [];
      this.users = data;
    });
    this.user = new User();
    this.address = new Address();
    this.myGroup = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl(),
      confirmPassword: new FormControl()
    });
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
  }
  matchPassword(): boolean{
    this.password = this.myGroup.get('password').value;
    this.confirmPassword = this.myGroup.get('confirmPassword').value;
    if (this.password === this.confirmPassword){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['users']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.user.fullName = this.myGroup.get('name').value;
    const num: number = this.myGroup.get('phone').value;
    this.user.phone = JSON.parse(String(num));
    this.user.email = this.myGroup.get('email').value;
    this.user.password = this.myGroup.get('password').value;
    this.address.street = this.myGroup.get('street').value;
    this.address.city = this.myGroup.get('city').value;
    this.address.zipCode = this.myGroup.get('zipcode').value;
    this.address.country = this.myGroup.get('country').value;
    this.user.adress = this.address;
    this.userService.save(this.user).subscribe(result => {
      if (this.previewUrl){
        this.changePhoto();
      }else {
        this.getAll();
      }
    });
  }
  // tslint:disable-next-line:typedef
  changePhoto(){
      this.upload();
      setTimeout(() =>
      {
        this.getAll();
      },
      4000);
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

  login(): boolean{
    return this.authService.isLoggedIn.getValue();
  }
  // de aici user change photo
  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileProgress(event);
  }
  // tslint:disable-next-line:typedef
  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
  }

  // tslint:disable-next-line:typedef
  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  formCompleted(): boolean{
    const name: string = this.myGroup.get('name').value;
    const phone: string = this.myGroup.get('phone').value;
    const password: string = this.myGroup.get('password').value;
    const street: string = this.myGroup.get('street').value;
    const city: string = this.myGroup.get('city').value;
    const zipcode: string = this.myGroup.get('zipcode').value;
    const country: string = this.myGroup.get('country').value;
    if (name !== '' && phone !== '' && password && street !== '' && city !== '' && zipcode !== '' && country !== ''){
      return true;
    }
    return false;
  }

  ifEmailExist(): boolean{
    const name: string = this.myGroup.get('email').value;
    for (const user of this.users){
      if (name === user.email){
        return true;
      }
    }
  }

}
