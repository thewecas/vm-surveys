import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponse } from 'src/app/model/response';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-view-responses',
  templateUrl: './view-responses.component.html',
  styleUrls: ['./view-responses.component.scss'],
})
export class ViewResponsesComponent implements OnInit {
  surveyId!: string;
  survey!: Survey | null;
  responseList: SurveyResponse[] = [];
  constructor(private service: SurveyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.surveyId = Object(res).id;
      this.survey = this.service.getSurveyDetails(this.surveyId);
      this.responseList = this.service.getResponseById(this.surveyId);
    });
  }

  getResponse(questionId: string, userEmail: string) {}
}

interface ResponseData {
  emailId: string;
  surveyId: string;
  submiitedOn: Date;
  response: {
    questionId: string;
    question: string;
    answer: string;
  }[];
}
