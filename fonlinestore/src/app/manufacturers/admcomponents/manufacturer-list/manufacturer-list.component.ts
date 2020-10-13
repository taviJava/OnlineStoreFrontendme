import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Manufacturer} from '../../model/manufacturer';
import {ManufacturerService} from '../../service/manufacturer.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  manufacturers: Manufacturer[];
  closeResult = '';
  searchValue = '';
  constructor(private manufacturerService: ManufacturerService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.manufacturers = [];
    this.getAll();
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = [];
      this.manufacturers = data;
    });
  }
  // tslint:disable-next-line:typedef
  add(){
    this.router.navigate(['addManufacturer']);
  }
  // tslint:disable-next-line:typedef
  editContinent(id: number) {
    this.router.navigate(['editManufacturer/' + id]);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.manufacturerService.delete(id).subscribe(data => {
      this.getAll();
    });
  }
  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
