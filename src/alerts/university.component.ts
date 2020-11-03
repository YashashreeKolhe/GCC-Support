import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertsService } from 'src/services/alerts.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { Participant } from 'src/participants/model';
import { UnlockLevel } from 'src/alerts/unlock-level.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

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
  currentRegion: string;
  currentUniversity: string;
  selected: boolean = false;
  selectGetLevel: boolean = false;
  level: string;
  levels: string[];
  contestantIdLevel: string;
  currentLevel: string;
  unlockLevelMessage: any;
  selectUnlockLevel: Boolean;
  
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
    this.level = '';
    this.levels = this.commonService.loadLevel();
    this.contestantIdLevel = '';
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

  async getCurrentRegionAndUniversity() {
    this.selected = true;
    try {
      if (this.contestantId.trim() !== '') {
        const result = await this.alertService.getContestantDetails(this.contestantId).toPromise() as Participant;
        this.currentRegion = result.region;
        this.currentUniversity = result.team;
      } else {
        this.toastr.error('Please enter contestant Id!', 'Error');
      }
    } catch (error) {
      this.toastr.error('Error occured!', 'Error');
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

  async onUnlockLevel(){
    this.selectUnlockLevel = true;
    try {
      if(this.contestantIdLevel.trim() === '' && this.level === ''){
        this.toastr.error('Please fill contestant id and select level!', 'Error');
        return;
      }
      else{
        const result =  this.alertService.unlockLevelForContestant(this.contestantIdLevel, this.level).toPromise().then().catch(err => this.toastr.info(err.error.text));
      }
    }catch (e){
      this.toastr.error("Level unlock failed!", 'Error');
      return;
    }
  }

  async getLevel(){
    this.selectGetLevel = true;
    try {
      if (this.contestantIdLevel.trim() !== '') {
        const result = await this.alertService.getContestantDetails(this.contestantIdLevel).toPromise() as Participant;
        this.currentLevel = result.level;
      } else {
        this.toastr.error('Please enter contestant Id!', 'Error');
      }
    } catch (error) {
      this.toastr.error('Error occured!', 'Error');
    }
  }
}