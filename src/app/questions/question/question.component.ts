import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onQuestionClick() {
    this.questionClick.emit(this.question.id);
  }

}
