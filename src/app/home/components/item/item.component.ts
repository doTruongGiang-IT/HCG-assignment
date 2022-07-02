import { HomeItemResponse } from './../../../core/models/home-item-response.model';
import { HomeItem } from './../../../core/models/home-item.model';
import { ApiResponse } from './../../../core/models/api-response.model';
import { tap, takeUntil } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { MenuService } from './../../../core/services/menu.service';
import { BaseWebComponent } from 'src/app/core/base';
import { Component, Input, OnChanges, OnInit, OnDestroy, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConstants } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseWebComponent implements OnInit, OnChanges, OnDestroy {
  @Input() itemList?: ApiResponse;
  itemNames: string[] = [];
  items: HomeItem[] = [];

  constructor(
    private menuService: MenuService,
    injector: Injector,
    route: ActivatedRoute,
  ) {
    super(injector, route);
  }

  ngOnChanges(): void {
    if (this.itemList?.results) {
      this.itemList.results.forEach(item => {
        this.itemNames.push(item.name);
      });
      this.getDetailForItem(this.itemNames);
    }
  }

  ngOnInit(): void {}

  initialState() {}

  getDetailForItem(names: string[]) {
    const names$ = names.map((name: string) => {
      return this.menuService.getDetailMenu(`${ApiConstants.ITEM_PATH}${name}`);
    });

    forkJoin(names$)
      .pipe(
        tap((res: HomeItemResponse[]) => {
          if (res) {
            res.forEach((item: HomeItemResponse) => {
              const itemFormat = {name: item?.name, image: item.sprites?.default};
              this.items.push(itemFormat);
            });
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
