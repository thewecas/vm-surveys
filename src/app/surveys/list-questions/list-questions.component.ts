import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveyQuestion } from 'src/app/model/survey-question';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
})
export class ListQuestionsComponent implements OnInit {
  @Input() questionList!: SurveyQuestion[];
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  handleAddQuestion() {
    const dialogRef = this._dialog.open(QuestionFormComponent);
  }

  trackById(index: number, item: SurveyQuestion) {
    return item.id;
  }
}
