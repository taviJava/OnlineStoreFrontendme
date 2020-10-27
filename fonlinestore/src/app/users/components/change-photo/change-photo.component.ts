import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css']
})
export class ChangePhotoComponent implements OnInit {
  user: User = new User();
  id: number;
  myGroup: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  matched = true;
  confirmPassword = '';
  // de aici

  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();
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
        confirmPassword: new FormControl(this.user.password)
      });
      });
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
  getPhoto(id: number): Observable<any>{
    return this.userService.getUserPhoto(id);
  }

  // tslint:disable-next-line:typedef
  goToUser() {
    this.router.navigate(['users']);
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.user).subscribe(result => {
      this.backToUserProfile();
    });
  }
// tslint:disable-next-line:typedef
changePhoto(){
  this.userService.deletePhoto(this.user.idPhoto).subscribe();
  this.upload();
  setTimeout(() =>
    {
      this.backToUserProfile();
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
  // tslint:disable-next-line:typedef
  backToUserProfile(){
    this.router.navigate(['userProfile']);
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
