import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() selectCountChange = new EventEmitter<number>();
  @Output() sortByChange = new EventEmitter<string>();
  
  sort = "desc";
  showCount = 12;

  onSort(newSort: string): void {
    this.sort = newSort;
    this.sortByChange.emit(newSort)
  }

  onSelectCount(count: number): void {
    this.showCount = count;
    this.selectCountChange.emit(count)
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }
}
