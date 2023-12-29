import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey';
import { QuestionFormComponent } from '../question-form/question-form.component';
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
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.survey = this.service.getSurveyDetails(Object(res).id);
    });
  }

  handleAddQuestion() {
    const dialogRef = this._dialog.open(QuestionFormComponent, {
      data: this.survey?.id,
    });
  }

  ngDestroy() {
    console.log('bye bye');
  }
}
