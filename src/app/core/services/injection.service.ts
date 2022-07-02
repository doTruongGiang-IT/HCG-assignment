import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './api.service';
import { DestroyService } from './destroy.service';

@Injectable({
  providedIn: 'root'
})
export class InjectionService extends DestroyService implements OnDestroy {
  protected readonly apiService: ApiService;
  protected readonly messageService: NzMessageService;

  constructor(
    protected readonly injector: Injector,
    protected readonly route?: ActivatedRoute,
  ) {
    super();

    this.apiService = injector.get(ApiService);
    this.messageService = injector.get(NzMessageService);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
