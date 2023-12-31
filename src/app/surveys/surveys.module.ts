import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoResizeDirective } from '../directives/auto-resize.directive';
import { LayoutComponent } from './layout/layout.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ListSurveysComponent } from './list-surveys/list-surveys.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveysRoutingModule } from './surveys-routing.module';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { ViewResponsesComponent } from './view-responses/view-responses.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';

@NgModule({
  declarations: [
    ListSurveysComponent,
    ListQuestionsComponent,
    QuestionFormComponent,
    LayoutComponent,
    SurveyFormComponent,
    ViewSurveyComponent,
    AutoResizeDirective,
    TakeSurveyComponent,
    ViewResponsesComponent,
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
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
})
export class SurveysModule {}
