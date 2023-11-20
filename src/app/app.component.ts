import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Clínica UQ';
  footer = 'Clínica UQ - 2023';
  isLogged = false;
  email: string = "";
  userType: string = "";
  userName: string = "";
  constructor(
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if(this.isLogged){
      this.email = this.tokenService.getEmail();
      this.userType = this.tokenService.getRole();
      this.userName = this.tokenService.getUsername();
    }
  }
  public logout() {
    this.tokenService.logout();
  }
}
