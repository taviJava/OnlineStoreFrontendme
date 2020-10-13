import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManufacturerService} from '../../service/manufacturer.service';
import {Manufacturer} from '../../model/manufacturer';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  manufacturer: Manufacturer = new Manufacturer();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private manufacturerService: ManufacturerService) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['manufacturers']);
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.manufacturerService.save(this.manufacturer).subscribe(result => this.getAll());
  }
}
