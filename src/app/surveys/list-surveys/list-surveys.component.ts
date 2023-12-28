import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Survey } from 'src/app/model/survey';
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
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
