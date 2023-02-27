import { Component } from "@angular/core";
import { Observable } from "rxjs";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent {

  constructor() {
    const ob$ = new Observable(observer => {

      let i = -1;

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i is 2');
        }
      }, 1000);
    });

    // -------- DEPRECATED -------------
    // ob$.subscribe(
    //   value => console.log('Subs: ', value),
    //   error => console.warn(error),
    //   () => console.info('Obs finished')
    // );

    ob$.subscribe({
      next: value => console.log('Subs: ', value),
      error: error => console.warn(error),
      complete: () => console.info('Obs finished')
    });
  }

}
