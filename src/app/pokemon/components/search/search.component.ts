import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() keyword = new EventEmitter<string>();
  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef;
  searchKey = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(300),
      distinctUntilChanged(),
    // tslint:disable-next-line:no-shadowed-variable
    ).subscribe((text: string) => {
      this.keyword.emit(text);
    });
  }

}
