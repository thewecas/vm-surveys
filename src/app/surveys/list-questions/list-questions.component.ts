import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SurveyQuestion } from 'src/app/model/survey-question';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
})
export class ListQuestionsComponent implements OnChanges {
  @Input() surveyId!: string;
  questionList!: SurveyQuestion[];
  constructor(
    private service: SurveyService,
    private route: ActivatedRoute,
    private _dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.questionList = [];
    this.service.getQuestionList(this.surveyId).subscribe((res) => {
      this.questionList = res;
    });
  }
  handleAddOrEditQuestion(questionId?: string, isReadOnly = false) {
    const data = {
      surveyId: this.surveyId,
      readOnly: isReadOnly,
    };
    if (questionId) Object.assign(data, { questionId });

    const dialogRef = this._dialog.open(QuestionFormComponent, {
      data: data,
    });
  }

  trackById(index: number, item: SurveyQuestion) {
    return item.id;
  }

  handleDeleteQuestion(questionId: string) {
    this.service.deleteQuestion(this.surveyId, questionId);
  }
}
