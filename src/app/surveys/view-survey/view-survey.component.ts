import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/model/survey';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SurveyFormComponent } from '../survey-form/survey-form.component';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss'],
})
export class ViewSurveyComponent implements OnInit {
  survey!: Survey | null;

  constructor(
    private route: ActivatedRoute,
    private service: SurveyService,
    private _dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.service.getSurveyList().subscribe((surveyList) => {
        this.survey =
          surveyList.find((survey) => survey.id == Object(res).id) ?? null;
      });
    });
  }

  handleExportResponses() {
    if (this.survey) this.service.exportData(this.survey?.id);
  }

  handleEditSurvey(surveyId: string) {
    const dialogRef = this._dialog.open(SurveyFormComponent, {
      data: surveyId,
    });
  }

  handleDelete(surveyId: string) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Surevy',
        highlight: this.survey?.name,
        body: `Following survey will be deleted. Are you Sure ?`,
        secondaryActionText: 'No, Cancel',
        primaryActionText: 'Yes, Delete',
        primaryColor: 'warn',
      },
    });
    dialogRef.afterClosed().subscribe((deleteSurvey) => {
      if (deleteSurvey) {
        this.service.deleteSurvey(surveyId);
        this.router.navigate(['/']);
      }
    });
  }
}
