import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../model/address';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  id: number;
  myGroup: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;
  progress = 0;
  message = '';
  matched = true;
  confirmPassword = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      newPassword: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl(),
      confirmPassword: new FormControl()
    });
    this.user = new User();
    this.user.adress = new Address();
    this.id = this.route.snapshot.params.id;
    this.userService.getById(this.id).subscribe(data => {
      this.user = new User();
      this.user = data;
      this.user.photo = this.getPhoto(this.user.id);
      this.myGroup = new FormGroup({
        name: new FormControl(this.user.fullName),
        phone: new FormControl(this.user.phone),
        email: new FormControl(this.user.email),
        password: new FormControl(this.user.password),
        newPassword: new FormControl(this.user.password),
        street: new FormControl(this.user.adress.street),
        city: new FormControl(this.user.adress.city),
        country: new FormControl(this.user.adress.country),
        zipcode: new FormControl(this.user.adress.zipCode),
        confirmPassword: new FormControl(this.user.password)
      });
    });
  }
  getPhoto(id: number): Observable<any>{
    return this.userService.getUserPhoto(id);
  }
  // tslint:disable-next-line:typedef
  matchPasswords() {
    this.confirmPassword = this.myGroup.get('confirmPassword').value;
    if (this.user.newPassword === '' || this.user.newPassword === this.confirmPassword) {
      this.matched = true;
    } else {
      this.matched = false;
    }
  }

  // tslint:disable-next-line:typedef
  goToUser() {
    this.router.navigate(['users']);
  }
  // tslint:disable-next-line:typedef
  changePhoto(){
    this.userService.deletePhoto(this.user.idPhoto).subscribe();
    this.upload();
    setTimeout(() =>
      {
        this.goToUser();
      },
      4000);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.user.fullName = this.myGroup.get('name').value;
    this.user.phone = this.myGroup.get('phone').value;
    this.user.email = this.myGroup.get('email').value;
    this.user.password = this.myGroup.get('password').value;
    this.user.adress.street = this.myGroup.get('street').value;
    this.user.adress.city = this.myGroup.get('city').value;
    this.user.adress.zipCode = this.myGroup.get('zipcode').value;
    this.user.adress.country = this.myGroup.get('country').value;
    console.log(this.user);
    this.userService.update(this.user).subscribe(result => {
      this.goToUser();
    });
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
          const a = event.body.id;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

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
}
