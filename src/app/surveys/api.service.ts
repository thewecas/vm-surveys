import { Injectable } from '@angular/core';
import { SurveyResponse } from '../model/response';
import { Survey } from '../model/survey';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  storeSurveyList(surveyList: Survey[]) {
    localStorage.setItem('surveys', JSON.stringify(surveyList));
  }

  getSurveyList() {
    const surveys = localStorage.getItem('surveys');
    return surveys ? JSON.parse(surveys) : this.getDummyDataSurveyData();
  }

  storeResponsesList(responseList: SurveyResponse[]) {
    localStorage.setItem('responses', JSON.stringify(responseList));
  }

  getResponseList() {
    const responses = localStorage.getItem('responses');
    return responses ? JSON.parse(responses) : this.getDummyResponseData();
  }

  getDummyDataSurveyData() {
    const data = [
      {
        id: '71db9449-d74d-4d5e-83de-727fb3619d13',
        name: 'IT Survey',
        description: 'Survey about experience of a customer in IT',
        questions: [
          {
            id: '285bd2da-231e-4540-9903-9f29d9639a6c',
            question:
              'What is the primary purpose of your interaction with our IT services? ',
            answerType: 'multiple-choice',
            instrctions: '',
            options: [
              ' Technical support',
              'Software usage',
              'Hardware issues',
              'Network connectivity',
            ],
          },
          {
            id: '2606925c-6e07-4e28-b24c-727f16145e5c',
            question:
              "Please describe a positive experience you've had with our IT services",
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: 'ec4289d7-8b31-44c3-8106-81c3156d77e0',
            question:
              'What improvements would you like to see in our IT services to enhance your overall experience?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: '62df40da-c737-469e-9fd7-c3bb4635e487',
            question:
              'How would you rate your overall satisfaction with the IT services provided by our company? ',
            answerType: 'single-choice',
            instrctions: '',
            options: [
              'Very Satisfied',
              'Satisfied',
              ' Neutral',
              'Dissatisfied',
              'Very Dissatisfied',
            ],
          },
          {
            id: 'c5ac3475-1f3b-4ab5-95bc-3d7641238ea2',
            question: 'Which IT tools or software do you use most frequently?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: 'c9a98d1b-0998-4dc1-97dd-65caf2f730e5',
            question:
              "Please describe a negative experience you've had with our IT services",
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
        ],
        createdOn: '2023-12-29T09:25:03.784Z',
      },
      {
        id: '811aaa8c-26d3-4c46-8030-9927b27322a0',
        name: 'Smartphone User Experience Survey',
        description:
          ' This survey aims to gather feedback on the user experience with smartphones to understand preferences, usage patterns, and satisfaction levels.',
        questions: [
          {
            id: '68111168-e45b-4a87-955a-d942f9cef443',
            question: 'What is your primary use for your smartphone?',
            answerType: 'multiple-choice',
            instrctions: '',
            options: [
              'Communication',
              'Entertainment',
              'Productivity',
              'Social Media',
              'Gaming',
              'Other',
            ],
          },
          {
            id: '3dc01de7-db8c-4ba9-86cc-e2d2188a709f',
            question:
              'Please describe a feature or app on your smartphone that you find most useful and why?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: '8eb33ddc-61d2-44a6-8b9f-8cfa88352550',
            question:
              'How often do you experience issues with the performance of your smartphone?',
            answerType: 'single-choice',
            instrctions: '',
            options: ['Rarely', 'Occasionally', 'Frequently', ' Almost Always'],
          },
          {
            id: '595e7eb8-bf28-4864-861d-448e1c172662',
            question:
              'Which factor is most important to you when choosing a smartphone? ',
            answerType: 'single-choice',
            instrctions: '',
            options: [
              'Price',
              'Brand',
              'Camera Quality',
              'Battery Life',
              'Operating System',
            ],
          },
          {
            id: '867255ba-a97f-4af8-b8a3-a9870efd5e3b',
            question:
              'How many hours per day, on average, do you spend using your smartphone? ',
            answerType: 'single-choice',
            instrctions: '',
            options: [
              'Less than 1 hour',
              '1-3 hours',
              '3-5 hours',
              'More than 5 hours',
            ],
          },
          {
            id: '34b2fff7-af4d-431b-8864-e7974138eae2',
            question: 'How often do you change your smartphone?',
            answerType: 'single-choice',
            instrctions: '',
            options: [
              'Once a Year',
              'Once per 2 Year',
              'Once per 3 Year',
              'More than 4 Year',
            ],
          },
        ],
        createdOn: '2023-12-29T09:33:43.160Z',
      },
      {
        id: 'cc7566b5-4923-42ea-99e6-a886f2327427',
        name: 'Remote Work',
        description:
          'Understanding the challenges and benefits of working from home or in a hybrid model, and exploring ways to improve the remote work experience.',
        questions: [
          {
            id: 'e2052a1c-6f19-4799-bc3c-fe0bc9928d8c',
            question: 'What is your current work situation?',
            answerType: 'single-choice',
            instrctions: '',
            options: [
              'Working from home',
              'Working in a hybrid model (partly from home, partly in the office)',
              'Working full-time in the office',
            ],
          },
          {
            id: 'f04cc9f9-f064-470a-b230-4191be412404',
            question: 'What do you find most challenging about remote work?',
            answerType: 'multiple-choice',
            instrctions: '',
            options: [
              'Work-life balance',
              'Communication with colleagues',
              'Technical issues',
              'Other',
            ],
          },
          {
            id: 'c9682584-c323-4d1a-b46b-6a0e70e65f30',
            question: 'What tools do you use for remote collaboration? ',
            answerType: 'multiple-choice',
            instrctions: 'Select all that apply',
            options: [
              'Zoom',
              'Microsoft Teams',
              'Slack',
              'Google Meet',
              'Other',
            ],
          },
          {
            id: '53ea2b75-6f06-4d7f-b193-13242ca537ec',
            question:
              'Do you think remote work has had a positive impact on your productivity?',
            answerType: 'single-choice',
            instrctions: '',
            options: ['Yes', 'No', 'Not sure'],
          },
          {
            id: '7b968667-87c7-4171-9899-048ff3a44dd1',
            question:
              'What changes would you like to see in your remote work setup to improve your experience?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: '8100b602-57bc-4cc0-b04f-ad28b936ad1f',
            question:
              'How do you maintain a sense of connection with your colleagues while working remotely?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: 'b0c789af-d1af-4b16-a8c6-6b3e6349b8cb',
            question: 'Which type of work Environment Do you Prefer?',
            answerType: 'single-choice',
            instrctions: '',
            options: ['WFH', 'WFO', 'Hybrid'],
          },
        ],
        createdOn: '2024-01-01T09:29:01.444Z',
      },
      {
        id: 'a2f5878f-73e1-49c0-bec3-7dcfcbaf68f7',
        name: 'Sustainable Living',
        description:
          'Assessing individual attitudes and behaviors towards sustainability, and identifying barriers and motivations for adopting more eco-friendly practices.',
        questions: [
          {
            id: '95d21133-8ee7-4ec4-9e59-04f52a0ab58b',
            question:
              'How important is sustainability to you in your daily life?',
            answerType: 'single-choice',
            instrctions: '',
            options: ['Very important', 'Somewhat important', 'Not important'],
          },
          {
            id: '5332f77c-c51e-49f9-ab60-d1cc304e4d99',
            question: 'What sustainable practices do you currently engage in? ',
            answerType: 'multiple-choice',
            instrctions: 'Select all that apply',
            options: [
              'Recycling',
              'Composting',
              'Using reusable products (e.g., water bottles, shopping bags)',
              'Conserving energy and water',
              'Other ',
            ],
          },
          {
            id: 'bb437685-ede3-4235-85eb-e33f776065f6',
            question:
              'What motivates you to live a more sustainable lifestyle?',
            answerType: 'free-text',
            instrctions: '',
            options: null,
          },
          {
            id: '185afe61-69e9-40c2-818f-18baaf3bc9f4',
            question:
              'What barriers do you face in adopting more sustainable habits?',
            answerType: 'multiple-choice',
            instrctions: '',
            options: [
              'Lack of information',
              'Cost',
              'Convenience',
              'Lack of time',
              'Other',
            ],
          },
        ],
        createdOn: '2024-01-01T09:33:14.186Z',
      },
    ];
    localStorage.setItem('surveys', JSON.stringify(data));
    return data;
  }
  getDummyResponseData() {
    const data = [
      {
        surveyId: '811aaa8c-26d3-4c46-8030-9927b27322a0',
        userEmail: 'thewecas@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'thewecas@gmail.com' },
          {
            questionId: '68111168-e45b-4a87-955a-d942f9cef443',
            answer: ['Entertainment'],
          },
          {
            questionId: '3dc01de7-db8c-4ba9-86cc-e2d2188a709f',
            answer: 'youtube',
          },
          {
            questionId: '8eb33ddc-61d2-44a6-8b9f-8cfa88352550',
            answer: 'Rarely',
          },
          {
            questionId: '595e7eb8-bf28-4864-861d-448e1c172662',
            answer: 'Battery Life',
          },
          {
            questionId: '867255ba-a97f-4af8-b8a3-a9870efd5e3b',
            answer: '3-5 hours',
          },
          {
            questionId: '34b2fff7-af4d-431b-8864-e7974138eae2',
            answer: 'Once per 2 Year',
          },
        ],
        dateOfSubmission: '2023-12-31T18:38:50.483Z',
      },
      {
        surveyId: '811aaa8c-26d3-4c46-8030-9927b27322a0',
        userEmail: 'laetsh@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'laetsh@gmail.com' },
          {
            questionId: '68111168-e45b-4a87-955a-d942f9cef443',
            answer: ['Social Media'],
          },
          {
            questionId: '3dc01de7-db8c-4ba9-86cc-e2d2188a709f',
            answer: 'whatsapp, instagram',
          },
          {
            questionId: '8eb33ddc-61d2-44a6-8b9f-8cfa88352550',
            answer: 'Occasionally',
          },
          {
            questionId: '595e7eb8-bf28-4864-861d-448e1c172662',
            answer: 'Battery Life',
          },
          {
            questionId: '867255ba-a97f-4af8-b8a3-a9870efd5e3b',
            answer: 'More than 5 hours',
          },
          {
            questionId: '34b2fff7-af4d-431b-8864-e7974138eae2',
            answer: 'Once a Year',
          },
        ],
        dateOfSubmission: '2023-12-31T18:39:14.852Z',
      },
      {
        surveyId: '811aaa8c-26d3-4c46-8030-9927b27322a0',
        userEmail: 'visshal@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'visshal@gmail.com' },
          {
            questionId: '68111168-e45b-4a87-955a-d942f9cef443',
            answer: [
              'Communication',
              'Entertainment',
              'Social Media',
              'Gaming',
              'Productivity',
            ],
          },
          {
            questionId: '3dc01de7-db8c-4ba9-86cc-e2d2188a709f',
            answer: 'Whatsapp',
          },
          {
            questionId: '8eb33ddc-61d2-44a6-8b9f-8cfa88352550',
            answer: 'Occasionally',
          },
          {
            questionId: '595e7eb8-bf28-4864-861d-448e1c172662',
            answer: 'Operating System',
          },
          {
            questionId: '867255ba-a97f-4af8-b8a3-a9870efd5e3b',
            answer: '3-5 hours',
          },
          {
            questionId: '34b2fff7-af4d-431b-8864-e7974138eae2',
            answer: 'Once per 2 Year',
          },
        ],
        dateOfSubmission: '2024-01-01T04:19:51.197Z',
      },
      {
        surveyId: '71db9449-d74d-4d5e-83de-727fb3619d13',
        userEmail: 'dvs@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'dvs@gmail.com' },
          {
            questionId: '285bd2da-231e-4540-9903-9f29d9639a6c',
            answer: ['Software usage'],
          },
          {
            questionId: '2606925c-6e07-4e28-b24c-727f16145e5c',
            answer: 'i got new laptop',
          },
          {
            questionId: 'ec4289d7-8b31-44c3-8106-81c3156d77e0',
            answer: 'give a proper bag to carry laptop',
          },
          {
            questionId: '62df40da-c737-469e-9fd7-c3bb4635e487',
            answer: ' Neutral',
          },
          {
            questionId: 'c5ac3475-1f3b-4ab5-95bc-3d7641238ea2',
            answer: 'vscode',
          },
          {
            questionId: 'c9a98d1b-0998-4dc1-97dd-65caf2f730e5',
            answer: 'not fully interactive person',
          },
        ],
        dateOfSubmission: '2024-01-01T09:25:03.260Z',
      },
      {
        surveyId: 'cc7566b5-4923-42ea-99e6-a886f2327427',
        userEmail: 'patilanand342@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'patilanand342@gmail.com' },
          {
            questionId: 'e2052a1c-6f19-4799-bc3c-fe0bc9928d8c',
            answer: 'Working full-time in the office',
          },
          {
            questionId: 'f04cc9f9-f064-470a-b230-4191be412404',
            answer: ['Communication with colleagues', 'Technical issues'],
          },
          {
            questionId: 'c9682584-c323-4d1a-b46b-6a0e70e65f30',
            answer: ['Microsoft Teams'],
          },
          { questionId: '53ea2b75-6f06-4d7f-b193-13242ca537ec', answer: 'No' },
          {
            questionId: '7b968667-87c7-4171-9899-048ff3a44dd1',
            answer:
              'Proper team communication set up dead lines for each task no matter how easy they are.',
          },
          {
            questionId: '8100b602-57bc-4cc0-b04f-ad28b936ad1f',
            answer: 'screen sharing, regular messaging about task status.',
          },
        ],
        dateOfSubmission: '2024-01-01T09:39:45.501Z',
      },
      {
        surveyId: 'cc7566b5-4923-42ea-99e6-a886f2327427',
        userEmail: 'vikas@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'vikas@gmail.com' },
          {
            questionId: 'e2052a1c-6f19-4799-bc3c-fe0bc9928d8c',
            answer: 'Working full-time in the office',
          },
          {
            questionId: 'f04cc9f9-f064-470a-b230-4191be412404',
            answer: ['Technical issues', 'Communication with colleagues'],
          },
          {
            questionId: 'c9682584-c323-4d1a-b46b-6a0e70e65f30',
            answer: ['Microsoft Teams'],
          },
          { questionId: '53ea2b75-6f06-4d7f-b193-13242ca537ec', answer: 'No' },
          {
            questionId: '7b968667-87c7-4171-9899-048ff3a44dd1',
            answer: 'Good internet',
          },
          {
            questionId: '8100b602-57bc-4cc0-b04f-ad28b936ad1f',
            answer: 'Through calls',
          },
          { questionId: 'b0c789af-d1af-4b16-a8c6-6b3e6349b8cb', answer: 'WFO' },
        ],
        dateOfSubmission: '2024-01-01T09:48:49.936Z',
      },
      {
        surveyId: 'cc7566b5-4923-42ea-99e6-a886f2327427',
        userEmail: 'anime@gmail.com',
        responses: [
          { questionId: 'userEmail', answer: 'anime@gmail.com' },
          {
            questionId: 'e2052a1c-6f19-4799-bc3c-fe0bc9928d8c',
            answer: 'Working full-time in the office',
          },
          {
            questionId: 'f04cc9f9-f064-470a-b230-4191be412404',
            answer: ['Other'],
          },
          {
            questionId: 'c9682584-c323-4d1a-b46b-6a0e70e65f30',
            answer: ['Google Meet', 'Slack', 'Microsoft Teams'],
          },
          { questionId: '53ea2b75-6f06-4d7f-b193-13242ca537ec', answer: 'No' },
          {
            questionId: '7b968667-87c7-4171-9899-048ff3a44dd1',
            answer: 'wifi setup',
          },
          {
            questionId: '8100b602-57bc-4cc0-b04f-ad28b936ad1f',
            answer: '      ',
          },
          {
            questionId: 'b0c789af-d1af-4b16-a8c6-6b3e6349b8cb',
            answer: 'Hybrid',
          },
        ],
        dateOfSubmission: '2024-01-01T11:16:08.166Z',
      },
    ];

    localStorage.setItem('responses', JSON.stringify(data));
    return data;
  }
}
