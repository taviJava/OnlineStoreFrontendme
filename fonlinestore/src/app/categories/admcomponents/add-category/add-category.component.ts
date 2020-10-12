import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
 category: Category = new Category();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryservice: CategoryService) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['categories']);
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.categoryservice.save(this.category).subscribe(result => this.getAll());
  }

}
