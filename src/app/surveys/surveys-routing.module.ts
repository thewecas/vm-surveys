import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'survey/:id',
        component: ViewSurveyComponent,
      },
    ],
  },
  {
    path: 'take-survey/:id',
    component: TakeSurveyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
