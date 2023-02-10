import { Component, OnInit } from "@angular/core";



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettings implements OnInit {

  linkTheme = document.querySelector('#theme');
  public links: any;

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach((element:any) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentThemeUrl = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentThemeUrl) {
        element.classList.add('working');
      }
    });
  }

}
