import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestroyService implements OnDestroy {
  protected destroyed$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
