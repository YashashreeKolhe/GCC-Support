import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertsService } from 'src/services/alerts.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { Alert } from './alert-model';

@Component({
  selector: 'create-alert',
  templateUrl: './create-alert.component.html',
})

export class CreateAlertComponent {
  @Input() mode: number;
  @Input() alert: Alert;
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  
  newParagraph: string = '';
  addParagraphFlag: number = 0;
  clientTypes: string[] = [
    'WEBAPP',
    'MOBILE'
  ];
  alertTypes: string[] = [
    'INFO',
    'WARNING',
    'ERROR',
    'UPDATE'
  ];
  
  
  constructor(
    private alertService: AlertsService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    if (this.mode === 1) {
      this.alert = this.initializeAlert();
    }
  }

  initializeAlert(): Alert {
    return {
      content: '',
      header: '',
      clientType: 'WEBAPP',
      active: true,
      alertType: 'INFO',
      timestamp: new Date().toISOString()
    } as Alert;
  }

  async onSaveAlert() {
    if (!this.validateAlert()) {
      this.toastr.error('Please fill the mandatory fields \'Header, Content, Status, Client Type, Alert Type\'!', 'Error');
      return;
    }
    try {
      if (this.mode === 1) {
        const result = await this.alertService.setAlert(this.alert).toPromise();
        this.toastr.success('Article saved successfully', 'Success');
      } else if (this.mode === 2) {
        const result = await this.alertService.updateAlert(this.alert).toPromise();
        this.toastr.success('Article updated successfully', 'Success');
        this.exit.emit();
      }
    } catch (e) {
      this.toastr.error("Save operation failed!", 'Error');
      return;
    }
  }

  cancel() {
    this.exit.emit();
  }

  validateAlert(): boolean {
    if (this.alert.header === null || this.alert.header.trim() === '') {
      return false;
    }
    if (this.alert.content === null || this.alert.content.trim() === '') {
      return false;
    }
    if (this.alert.active === null) {
      return false;
    }
    if (this.alert.clientType === 'NONE') {
      return false;
    }
    if (this.alert.alertType === 'NONE') {
      return false;
    }
    return true;
  }

  onResetAlert() {
    this.alert = this.initializeAlert();
  }
}