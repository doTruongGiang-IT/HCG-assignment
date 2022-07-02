import { QueryConstants } from './../constants/query.constant';
import { InjectionService } from './../services/injection.service';
import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Param } from '../models';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseWebComponent extends InjectionService implements OnInit, OnDestroy {
  public isLoading = false;

  protected keyword?: string;

  protected limit = QueryConstants.DEFAULT_LIMIT;
  protected currentPage = QueryConstants.DEFAULT_CURRENT_PAGE;

  constructor(
    protected readonly injector: Injector,
    protected readonly route?: ActivatedRoute,
  ) {
    super(injector, route);
  }

  public ngOnInit(): void {
    this.initialState();
  }

  /**
   * TODO: Override the method as desired
   */
  protected abstract initialState(): any;

  /**
   * @returns query params { page, limit, sortby, keyword, category_id }
   */
  protected get queryParams(): any {
    const params: Param = {
      page: this.currentPage
        ? String(this.currentPage)
        : String(QueryConstants.DEFAULT_CURRENT_PAGE),

      limit: this.limit
        ? String(this.limit)
        : String(QueryConstants.DEFAULT_LIMIT),
    };

    if (this.keyword !== undefined || this.keyword !== null) {
      params.keyword = this.keyword;
    }

    return params;
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
