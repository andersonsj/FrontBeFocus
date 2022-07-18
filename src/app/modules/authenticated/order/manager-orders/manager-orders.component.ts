import { NotificationService } from './../../../../services/notifications/notification.service';
import { ManagerOrdersService } from './../../../../services/order/manager-orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-orders',
  templateUrl: './manager-orders.component.html',
  styleUrls: ['./manager-orders.component.css']
})
export class ManagerOrdersComponent implements OnInit {

  constructor(private managerOrdersService: ManagerOrdersService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }



}
