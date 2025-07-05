import { Component, EventEmitter, Output } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {UserApiService} from "../../../profile/services/user-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconButton,
    MatIcon,
    NgIf,
    MatButton,
    RouterLink,
    NgForOf,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private userApiService: UserApiService,
              private router: Router) {
  }

  isFarmer: boolean = this.userApiService.getIsFarmer();

  getSections(): string[] {
    this.isFarmer = this.userApiService.getIsFarmer();
    if (this.isFarmer) {
      return ["Citas", "Asesores", "Publicaciones", "Mi Granja", "Foro", "Notificaciones", "Perfil",];
    } else {
      return ["Citas", "Mis publicaciones", "Horarios", "Foro", "Notificaciones", "Perfil"];
    }
  }

  getSectionRoute(section: string): string {
    switch (section) {
      case "Citas":
        return this.isFarmer ? "granjero/citas" : "asesor/citas";
      case "Asesores":
        return "granjero/asesores";
      case "Publicaciones":
        return "granjero/publicaciones";
      case "Mi Granja":
        return "granjero/mi-granja";
      case "Notificaciones":
        return this.isFarmer ? "granjero/notificaciones" : "asesor/notificaciones";
      case "Mis publicaciones":
        return "asesor/mis-publicaciones";
      case "Horarios":
        return "asesor/horarios";
      case "Perfil":
        return this.isFarmer ? "granjero/perfil" : "asesor/perfil";
      case "Foro":
        return "foro";
      default:
        return "/";
    }
  }

  isLogged() {
    return this.userApiService.isLogged();
  }

  logOut() {
    this.userApiService.logOut();
    this.router.navigateByUrl('/login');
  }

  toggleDarkMode(): void {
    const body = document.body;
    const html = document.documentElement;
    body.classList.toggle('dark-mode');
    html.classList.toggle('dark-mode');
  }
}
