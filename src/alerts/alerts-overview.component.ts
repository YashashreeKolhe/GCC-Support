import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ITab } from 'src/faqs/model';
import { Alert } from './alert-model'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsService } from 'src/services/alerts.service';
import { Router } from '@angular/router';
import { CreateAlertComponent } from './create-alert.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'alerts',
  templateUrl: './alerts-overview.component.html',
  styleUrls: ['./alerts-overview.component.css']

})
export class AlertsOverviewComponent {
  selectedarticle: Alert;
  modalRef: BsModalRef;
  activeTab: string = 'Active Alert';

  tabs: ITab[] = [
    {
      id: 1,
      title: 'Active Alert'
    },
    {
      id: 2,
      title: 'Create Alert'
    },
  ];
  rowData: any;
  activeAlerts: Alert[];
  inactiveAlerts: Alert[];
  mode: number = 1; //create
  title: string;

  constructor(private toastr: ToastrService,
    private alertService: AlertsService) { }

  @ViewChild('alertUpdate') articleDetails: CreateAlertComponent;

  ngOnInit() {
    this.loadActiveAlertsForWebapp();
    this.loadActiveAlertsForMobile();
  }

  async loadActiveAlertsForWebapp() {
    this.activeAlerts = await this.alertService.getAlertsForWebapp().toPromise();
  }

  async loadActiveAlertsForMobile() {
    this.inactiveAlerts = await this.alertService.getAlertsForMobile().toPromise();
  }

  onTabChange(tabId: number) {
    if (tabId === 1) {
      this.loadActiveAlertsForWebapp();
      this.loadActiveAlertsForMobile();
    }
  }

  async turnOffActiveAlerts() {
    try {
      const result = await this.alertService.turnOffActiveAlerts().toPromise();
      if (result === true) {
        this.toastr.success("All alerts turned off!", 'Success');
      } else {
        this.toastr.error("Error occurred!", 'Error');
      }
    } catch(ex) {
      this.toastr.error("Error occurred! " + ex.message, 'Error');
    }
    this.loadActiveAlertsForWebapp();
    this.loadActiveAlertsForMobile();
  }

  async alertcontent(alertId: string) {

  }

  async turnOffAlert(clientType) {
    try {
      const result = await this.alertService.turnOffActiveAlert(clientType).toPromise();
      if (result === true) {
        this.toastr.success("Alert turned off!", 'Success');
      } else {
        this.toastr.error("Error occurred!", 'Error');
      }
    } catch(ex) {
      this.toastr.error("Error occurred! " + ex.message, 'Error');
    }
    this.loadActiveAlertsForWebapp();
    this.loadActiveAlertsForMobile();
  }

  async turnOnAlert(alert: Alert) {
    alert.active = true;
    try {
      const result = await this.alertService.updateAlert(alert).toPromise();
      if (result) {
        this.toastr.success("All alerts turned off!", 'Success');
      } else {
        this.toastr.error("Error turning on alert!", 'Error');
      }
    } catch(ex) {
      this.toastr.error("Error turning on alert! " + ex.message, 'Error');
    }
  }
}


