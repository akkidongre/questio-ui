import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchKey = '';

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.commonService.searchQuery.next(this.searchKey);
  }

  ngOnDestroy() {
    this.commonService.searchQuery.next('');
  }

}
