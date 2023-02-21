import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-promises',
  templateUrl: 'promises.component.html',
  styleUrls: []
})
export class PromisesComponent implements OnInit {

  ngOnInit(): void {
    const promise = new Promise((resolve, reject) => {
      console.log('Hello world');

      if (false) {
        resolve('Future then...');
      } else {
        reject('Something is wrong');
      }


    });

    promise.then((message) => {
      console.log(message);
    }).catch(err => {
      console.warn(err);
    });

    console.log('Init ends');
  }
}
