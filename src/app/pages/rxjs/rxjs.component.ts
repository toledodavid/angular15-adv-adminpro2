import { Component } from "@angular/core";
import { filter, interval, map, Observable, retry, take } from "rxjs";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent {

  constructor() {

    // -------- DEPRECATED -------------
    // ob$.subscribe(
    //   value => console.log('Subs: ', value),
    //   error => console.warn(error),
    //   () => console.info('Obs finished')
    // );



    // this.returnsObservable().pipe(retry(2)).subscribe({
    //   next: value => console.log('Subs: ', value),
    //   error: error => console.warn(error),
    //   complete: () => console.info('Obs finished')
    // });


    this.returnsInterval().subscribe(console.log);
  }

  returnsObservable() {
    let i = -1;

    const ob$ = new Observable<number>(observer => {

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

    return ob$;
  }

  returnsInterval(): Observable<number> {
    const interval$ = interval(500).pipe(
      map((value) => value + 1),
      filter(value => value % 2 === 0),
      take(10)
    );

    return interval$;
  }

}
