import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category = new Category();
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.category = new Category();
    this.id = this.route.snapshot.params.id;
    this.categoryService.getById(this.id).subscribe(data => {
      this.category = new Category();
      this.category = data;
    });
  }

  // tslint:disable-next-line:typedef
  gotoCategoryList() {
    this.router.navigate(['categories']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.categoryService.update(this.category).subscribe(result => this.gotoCategoryList());
  }

}
