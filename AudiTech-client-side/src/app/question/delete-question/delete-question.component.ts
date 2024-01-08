import { Component } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { QuestionService } from '../../services/api/questions/questions.service'; // Import your QuestionService


@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrl: './delete-question.component.css'
})
export class DeleteQuestionComponent {

  selectedQuestionID!: string | null;


  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService // Inject your QuestionService

  ) { }

  ngOnInit(): void {
    this.sharedService.selectedQuestionID$.subscribe((questionID) => {
      console.log('Selected Question ID for Update:', questionID);
      this.selectedQuestionID = questionID;
    });
  }

  deleteQuestion(): void {
    if (this.selectedQuestionID) {
      this.questionService.deleteQuestion(this.selectedQuestionID!).subscribe(
        (response: any) => {
          console.log('Question deleted successfully:', response);
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
