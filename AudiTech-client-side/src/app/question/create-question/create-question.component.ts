import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { QuestionService } from '../../services/api/questions/questions.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  questionData: any = {
    heading: '',
    section: '',
    type: 'multiple',
    questionText: '',
    choices: [],
    comment: '',
  };

  selectedHeadingID: string | null = null;

  constructor(
    private sharedService: SharedService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.sharedService.selectedHeadingID$.subscribe((headingID) => {
      this.selectedHeadingID = headingID;
    });
  }

  choices: string[] = [];
  choicesModel: string[] = [];

  addChoice() {
    this.choices.push('');
    this.choicesModel.push('');
  }

  removeChoice(index: number) {
    this.choices.splice(index, 1);
    this.choicesModel.splice(index, 1);
  }

  onSubmit() {
    // Set the question.heading to the selectedHeadingID
    this.questionData.heading = this.selectedHeadingID;

    // Assign the choices from choicesModel to questionData.choices
    this.questionData.choices = this.choicesModel;

    this.questionService.createQuestion(this.questionData).subscribe(
      (data) => {
        console.log('Question created successfully:', data);
        // Redirect or perform any other action after successful creation

        window.location.reload();
      },
      (error) => {
        console.error('Error creating question:', error);
        // Handle error
      }
    );
  }


  trackByFn(index: number, item: any): any {
    return index;
  }

}
