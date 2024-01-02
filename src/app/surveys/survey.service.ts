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

  addQuestionToSurvey(
    surveyId: string,
    newQuestion: SurveyQuestion,
    questionId: string
  ) {
    const surveyIndex = this.surveyList.findIndex(
      (survey) => survey.id == surveyId
    );
    if (questionId) {
      const questionIndex = this.surveyList[surveyIndex].questions.findIndex(
        (question) => question.id == questionId
      );
      this.surveyList[surveyIndex].questions[questionIndex] = newQuestion;
    } else this.surveyList[surveyIndex].questions.push(newQuestion);

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

  getQuestionData(surveyId: string, questionId: string) {
    const surveyQuestions =
      this.surveyList.find((survey) => survey.id == surveyId)?.questions ?? [];
    return (
      surveyQuestions.find((question) => question.id == questionId) ?? null
    );
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

  deleteQuestion(surveyId: string, questionId: string) {
    const surveyIndex = this.surveyList.findIndex(
      (survey) => survey.id == surveyId
    );
    if (surveyIndex) {
      const questionIndex = this.surveyList[surveyIndex].questions.findIndex(
        (question) => question.id == questionId
      );
      this.surveyList[surveyIndex].questions.splice(questionIndex, 1);
    }
    this.api.storeSurveyList(this.surveyList);
  }
}
