import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LayoutComponent } from './layout/layout.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ListSurveysComponent } from './list-surveys/list-surveys.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveysRoutingModule } from './surveys-routing.module';
import { ViewSurveyComponent } from './view-survey/view-survey.component';

@NgModule({
  declarations: [
    ListSurveysComponent,
    ListQuestionsComponent,
    QuestionFormComponent,
    LayoutComponent,
    SurveyFormComponent,
    ViewSurveyComponent,
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class SurveysModule {}
