import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  linkTheme = document.querySelector('#theme');

  ngOnInit(): void {
    const themeUrl = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', themeUrl);
  }

}
