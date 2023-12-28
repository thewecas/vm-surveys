import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  title = 'Add Question';
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.maxLength(150)]],
      instrctions: ['', Validators.maxLength(250)],
      answerType: ['', Validators.required],
    });
  }

  handleCreateQuestion() {}
}
