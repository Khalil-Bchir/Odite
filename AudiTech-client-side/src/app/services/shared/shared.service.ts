// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedHeadingIDSubject = new BehaviorSubject<string | null>(null);
  private selectedQuestionIDSubject = new BehaviorSubject<string | null>(null);

  private userType: string | null = null;
  private userID: string | null = null;

  selectedHeadingID$: Observable<string | null> = this.selectedHeadingIDSubject.asObservable();
  selectedQuestionID$: Observable<string | null> = this.selectedQuestionIDSubject.asObservable();

  constructor() {}

  setUserType(userType: string | null): void {
    this.userType = userType;
  }

  setUserID(userID: string | null): void {
    this.userID = userID;
  }

  setHeadingSectionID(headingID: string | null): void {
    this.selectedHeadingIDSubject.next(headingID);
  }

  setSelectedQuestionID(questionID: string | null): void {
    this.selectedQuestionIDSubject.next(questionID);
  }

  getUserType(): string | null {
    return this.userType;
  }

  getUserID(): string | null {
    return this.userID;
  }

  getHeadingSectionID(): string | null {
    return this.selectedHeadingIDSubject.getValue();
  }

  getSelectedQuestionID(): string | null {
    return this.selectedQuestionIDSubject.getValue();
  }
}
