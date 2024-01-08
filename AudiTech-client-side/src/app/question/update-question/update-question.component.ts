// update-question.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { QuestionService } from '../../services/api/questions/questions.service'; // Import your QuestionService
import { QuestionRepresentaion } from '../../services/api/models/question-representation'; // Import your QuestionRepresentation model

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  selectedQuestionID!: string | null;
  updatedQuestion: QuestionRepresentaion = {} as QuestionRepresentaion;

  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService // Inject your QuestionService
  ) { }

  ngOnInit(): void {
    this.sharedService.selectedQuestionID$.subscribe((questionID) => {
      console.log('Selected Question ID for Update:', questionID);
      this.selectedQuestionID = questionID;

      // Fetch question details based on questionID
      if (questionID) {
        this.questionService.getQuestionById(questionID).subscribe(
          (questionDetails) => {
            this.updatedQuestion = questionDetails;
          },
          (error) => {
            console.error('Error fetching question details:', error);
          }
        );
      }
    });
  }


  addChoice(): void {
    if (this.updatedQuestion.choices) {
      this.updatedQuestion.choices.push('');
    }
  }

  // Method to remove a choice
  removeChoice(index: number): void {
    if (this.updatedQuestion.choices) {
      this.updatedQuestion.choices.splice(index, 1);
    }
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  updateQuestion(): void {
    if (this.selectedQuestionID) {
      // Call the updateQuestion method from your QuestionService
      this.questionService.updateQuestion(this.selectedQuestionID, this.updatedQuestion).subscribe(
        (updatedQuestionResponse) => {
          console.log('Question updated successfully:', updatedQuestionResponse);
          // You may want to perform additional actions after updating the question
          window.location.reload();

        },
        (error) => {
          console.error('Error updating question:', error);
        }
      );
    }
  }
}
