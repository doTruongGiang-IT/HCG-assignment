import { ApiResponse } from './../../../core/models/api-response.model';
import { ApiConstants } from './../../../core/constants/api.constant';
import { tap, takeUntil } from 'rxjs/operators';
import { Item } from '../../../core/models/item.model';
import { MenuService } from './../../../core/services/menu.service';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseWebComponent } from 'src/app/core/base/base.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent extends BaseWebComponent implements OnInit, OnDestroy {
  gameMenu: Item[] = [];
  generationMenu: Item[] = [];
  locationMenu: Item[] = [];
  itemMenu: Item[] = [];
  gameRoute = ApiConstants.GAME_PATH;
  generationRoute = ApiConstants.GENERATION_PATH;
  locationRoute = ApiConstants.LOCATION_PATH;
  itemRoute = ApiConstants.ITEM_PATH;

  constructor(
    private readonly menuService: MenuService,
    injector: Injector,
    route: ActivatedRoute,
  ) {
    super(injector, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialState(): any {
    const game = this.menuService.getMenu(this.gameRoute);
    const generation = this.menuService.getMenu(this.generationRoute);
    const location = this.menuService.getMenu(this.locationRoute);
    const item = this.menuService.getMenu(this.itemRoute);

    forkJoin([game, generation, location, item])
      .pipe(
        tap((res: ApiResponse[]) => {
          if (res) {
            this.gameMenu = res[0].results;
            this.generationMenu = res[1].results;
            this.locationMenu = res[2].results;
            this.itemMenu = res[3].results;
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
