import {Component, OnInit} from '@angular/core';
import {Manufacturer} from '../../model/manufacturer';
import {ActivatedRoute, Router} from '@angular/router';
import {ManufacturerService} from '../../service/manufacturer.service';

@Component({
  selector: 'app-manufacturer-edit',
  templateUrl: './manufacturer-edit.component.html',
  styleUrls: ['./manufacturer-edit.component.css']
})
export class ManufacturerEditComponent implements OnInit {
  manufacturer: Manufacturer = new Manufacturer();
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private manufacturerService: ManufacturerService,) {
  }

  ngOnInit(): void {
    this.manufacturer = new Manufacturer();
    this.id = this.route.snapshot.params.id;
    this.manufacturerService.getById(this.id).subscribe(data => {
    //  this.manufacturer = new Manufacturer();
      this.manufacturer = data;
    });
  }

  // tslint:disable-next-line:typedef
  gotoList() {
    this.router.navigate(['manufacturers']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.manufacturerService.update(this.manufacturer).subscribe(result => this.gotoList());
  }
}
