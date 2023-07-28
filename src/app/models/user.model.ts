import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(public name: string,
    public email: string,
    public password?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public google?: string,
    public img?: string,
    public uid?: string) {

  }

  get imageUrl() {
    // localhost:3003/api/upload/users/no-image

    if (!this.img) {
      return `${base_url}/upload/users/no-image`;
    }else if (this.img?.includes('https')) {
      return this.img;
    }else if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-image`;
    }
  }
}
