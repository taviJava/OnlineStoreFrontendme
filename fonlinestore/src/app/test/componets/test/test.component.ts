import {Component,  OnInit} from '@angular/core';
import {ProductService} from '../../../products/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../orders/service/order.service';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private orderService: OrderService,
              private authService: AuthenticationService,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {

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
