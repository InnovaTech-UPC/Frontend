import {Component, OnInit} from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import {FormsModule} from "@angular/forms";


//Import the NotificationApiService

import { Router } from "@angular/router";
import {NotificationApiService} from "../../../appointment/services/notification-api.service";
import {Notification} from "../../../appointment/models/notification.model";
import {UserApiService} from "../../services/user-api.service";


@Component({
  selector: 'app-notifications-view-advisor-view',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButton,
    MatCardModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatIconModule
  ],
  templateUrl: './notifications-view.component.html',
  styleUrl: './notifications-view.component.css'
})
export class NotificationsViewComponent implements OnInit{
  notifications: Notification[] = [];
  userId = 0;

  constructor(private notificationsApiService: NotificationApiService,
              private userApiService: UserApiService) {
  }

  ngOnInit(): void {
    this.userId = this.userApiService.getUserId();
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsApiService.getNotificationsByUserId(this.userId).subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      }, error: (error) => {
        console.error("Error al obtener las notificaciones:", error);
      }
    })

  }

  deleteNotification(id: number) {
    this.notificationsApiService.delete(id).subscribe(() => {
      console.log("Notificación eliminada con éxito.");
      this.notifications = this.notifications.filter((notification: any) => notification.id !== id);
    }, (error) => {
      console.error("Error al eliminar la notificación:", error);
    });
  }

  formatDate(dateString: string): string {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${day} de ${months[parseInt(month, 10) - 1]} de ${year}, ${hour}:${minute}`;
  }
}
