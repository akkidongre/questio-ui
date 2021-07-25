import { Injectable } from "@angular/core";
import questionsData from '../questions.json';
import { Question } from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private questionsList = questionsData.questions;

    constructor() {}

    getQuestions(): Question[] {
        return this.questionsList.slice();
    }

    getQuestionById(id: number): Question | null {
        for (let question of this.questionsList) {
            if (question.id === id) {
                return question;
            }
        }

        return null;
    }
}