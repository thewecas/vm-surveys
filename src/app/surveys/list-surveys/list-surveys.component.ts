import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Survey } from 'src/app/model/survey';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SurveyFormComponent } from '../survey-form/survey-form.component';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-list-surveys',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.scss'],
})
export class ListSurveysComponent implements OnInit {
  constructor(private _dialog: MatDialog, private service: SurveyService) {}

  surveyList!: Survey[];

  ngOnInit(): void {
    this.service.getSurveyList().subscribe((res) => {
      this.surveyList = res;
    });
  }

  openSurveyForm() {
    const dialogRef = this._dialog.open(SurveyFormComponent);
  }

  count = 0;
  resetData() {
    this.count++;
    if (this.count == 3) {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Reset Data',
          body: 'All the Surevy and their responses will be Reset.',
          highlight: 'Are you sure ?',
          secondaryActionText: 'No, Cancel',
          primaryActionText: 'Yes, Reset Data',
          primaryColor: 'warn',
        },
      });
      dialogRef.afterClosed().subscribe((isReset) => {
        if (isReset) {
          this.service.resetData();
        }
      });
      this.count = 0;
    }
  }
}
