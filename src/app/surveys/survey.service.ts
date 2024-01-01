import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { utils, writeFileXLSX } from 'xlsx';
import { QuestionResponse, SurveyResponse } from '../model/response';
import { Survey } from '../model/survey';
import { SurveyQuestion } from '../model/survey-question';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  surveyList: Survey[] = [];
  responseList: SurveyResponse[] = [];

  surveyList$ = new BehaviorSubject<Survey[]>(this.surveyList);
  constructor(private api: ApiService) {
    this.surveyList.push(...this.api.getSurveyList());
    this.responseList.push(...this.api.getResponseList());
  }

  getSurveyList() {
    return this.surveyList$.asObservable();
  }

  postSurvey(newSurvey: Survey) {
    this.surveyList.push(newSurvey);
    this.api.storeSurveyList(this.surveyList);
  }

  getSurveyDetails(id: string): Survey | null {
    return this.surveyList.find((survey) => survey.id == id) ?? null;
  }

  getQuestionList(surveyId: string) {
    return new BehaviorSubject<SurveyQuestion[]>(
      this.surveyList.find((survey) => survey.id == surveyId)?.questions ?? []
    );
  }

  addQuestionToSurvey(surveyId: string, newQuestion: SurveyQuestion) {
    this.surveyList
      .find((survey) => survey.id == surveyId)
      ?.questions.push(newQuestion);
    this.api.storeSurveyList(this.surveyList);
  }

  saveResponse(
    surveyId: string,
    userEmail: string,
    responseArray: QuestionResponse[]
  ) {
    const surveyResponse = {
      surveyId: surveyId,
      userEmail: userEmail,
      responses: responseArray,
      dateOfSubmission: new Date(),
    };
    this.responseList.push(surveyResponse);
    this.api.storeResponsesList(this.responseList);
  }

  getResponseById(surveyId: string) {
    return this.responseList.filter(
      (response) => response.surveyId == surveyId
    );
  }

  getQuestionById(surveyId: string, questionId: string) {
    const surveyQuestions =
      this.surveyList.find((survey) => survey.id == surveyId)?.questions ?? [];
    return surveyQuestions.find((question) => question.id == questionId)
      ?.question;
  }

  exportData(surveyId: string) {
    const survey = this.getSurveyDetails(surveyId);
    let filename = 'data.xlsx';
    if (survey)
      filename =
        survey.name +
        ' | ' +
        new Date().toLocaleDateString() +
        ' | ' +
        new Date().toLocaleTimeString() +
        '.xlsx';

    const data = this.prepareData(surveyId);
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new(worksheet, 'responses');
    writeFileXLSX(workbook, filename);
  }

  prepareData(surveyId: string) {
    const data: any[] = [];
    this.getResponseById(surveyId).forEach((responseObj) => {
      const responseData: any = {};
      Object.assign(responseData, {
        'Date of Submission': new Date(
          responseObj.dateOfSubmission
        ).toLocaleString(),
        'User Email': responseObj.userEmail,
      });
      responseObj.responses.forEach((response) => {
        if (response.questionId !== 'userEmail') {
          const question: string =
            this.getQuestionById(surveyId, response.questionId) ?? '';
          if (Array.isArray(response.answer))
            responseData[question] = response.answer.join(',');
          else responseData[question] = response.answer;
        }
      });
      data.push(responseData);
    });
    return data;
  }

  // addDummyData() {
  //   this.surveyList.push({
  //     id: '8e74acd8-dde2-4149-9588-0553dbf6ff5a',
  //     name: 'Survey 1',
  //     description: 'Some random description',
  //     questions: [],
  //     createdOn: new Date('2023-12-28T09:57:41.755Z'),
  //   });

  //   this.surveyList.push({
  //     id: 'b7862c0d-ccbb-4786-b441-38c4f0b6d3a0',
  //     name: 'Survey 2',
  //     description:
  //       " Some Description that is more that a line long , so basically I'm trying to put some long description ",
  //     questions: [],
  //     createdOn: new Date('2023-12-28T09:59:19.609Z'),
  //   });
  //   this.surveyList.push({
  //     id: '50679706-bc05-4567-8c81-9d806d4f3d20',
  //     name: 'Survey 3',
  //     description: 'Awesome Description Here',
  //     questions: [],
  //     createdOn: new Date('2023-12-28T10:00:46.487Z'),
  //   });
  //   this.surveyList.push({
  //     id: '12243c27-7334-487a-8bb4-b92107441d69',
  //     name: 'New Survey',
  //     description: 'No More Description',
  //     questions: [],
  //     createdOn: new Date('2023-12-28T10:49:34.118Z'),
  //   });
  // }
}
