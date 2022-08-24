import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from '@interface/responseLogin';
import { ActivityLogService } from '@services/activityLog/activity-log.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-dashboard-item-four',
  templateUrl: './dashboard-item-four.component.html',
  styleUrls: ['./dashboard-item-four.component.css']
})
export class DashboardItemFourComponent implements OnInit {

  public userCurrent!: ResponseLogin;

  constructor(private activityLogService: ActivityLogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.userCurrent.subscribe(userCurrent => {
      this.userCurrent = userCurrent;
      this.getActivityLog("1", String(this.userCurrent));
    });
  }

  private getActivityLog(userCode: string, companyCode: string) {
    this.activityLogService.getActivityLog(userCode, companyCode).subscribe(data => {
      console.log("getActivityLog");
      console.log(data);
    });
  }

}
