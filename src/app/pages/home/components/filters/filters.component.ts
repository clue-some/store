import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html' 
})
export class FiltersComponent implements OnInit {
  @Output() categoryChange = new EventEmitter<string>();

  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe(
      (_categories) => { this.categories = _categories }
    )
  }

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category)
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }
}
