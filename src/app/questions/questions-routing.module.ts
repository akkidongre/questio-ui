import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionsComponent } from './questions.component';

const routes: Routes = [
  { path: 'question-details/:id', component: QuestionDetailsComponent},
  { path: '', component: QuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
