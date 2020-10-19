import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertsService } from 'src/services/alerts.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'university',
  templateUrl: './university.component.html',
})

export class UniversityComponent {
  regions: string[];
  universityName: string;
  contestantId: string;
  contestantUnivName: string;
  region: string;
  contestantRegion: string;
  
  constructor(
    private alertService: AlertsService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.regions = this.commonService.loadRegions();
    this.universityName = '';
    this.contestantId = '';
    this.contestantUnivName = '';
    this.region = '';
    this.contestantRegion = '';
  }

  async onSaveUniversity() {
    if (this.region === "None" || this.universityName.trim() === '') {
      this.toastr.error('Please fill the region and university name!', 'Error');
      return;
    }
    try {
      const result = await this.alertService.setUniversityForRegion(this.universityName, this.region).toPromise();
      this.toastr.success('University added successfully!', 'Success');
    } catch (e) {
      this.toastr.error("Save operation failed!", 'Error');
      return;
    }
  }

  async onSaveContestantUniversityOrRegion() {
    if (this.contestantId.trim() === '' || (this.contestantUnivName.trim() === '' && this.contestantRegion === '')) {
      this.toastr.error('Please fill the contestant Id and either university name or region!', 'Error');
      return;
    }
    try {
      if (this.contestantRegion !== '') {
        const res1 = await this.alertService.setRegionForContestant(this.contestantId, this.contestantRegion).toPromise();
      }
      if (this.contestantUnivName.trim() !== '') {
        const result = await this.alertService.setUniversityForContestant(this.contestantId, this.contestantUnivName).toPromise();
      }
      this.toastr.success('University and/or region updated successfully!', 'Success');
    } catch (e) {
      this.toastr.error("Save operation failed!", 'Error');
      return;
    }
  }
}