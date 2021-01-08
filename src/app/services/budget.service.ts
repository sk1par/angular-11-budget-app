import { Injectable } from '@angular/core';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private currentBudgetListSubject = new BehaviorSubject<BudgetItemInterface[]>([]);
  public currentBudgetList = this.currentBudgetListSubject.asObservable().pipe(distinctUntilChanged());

  private currentBudgetSubject = new BehaviorSubject<number>(0);
  public currentBudget = this.currentBudgetSubject.asObservable().pipe(distinctUntilChanged());

  constructor() { }

  addItemToList(item: BudgetItemInterface[]): BudgetItemInterface[] {
    this.currentBudgetListSubject.next([...this.currentBudgetListSubject.getValue(), ...item]);
    return this.currentBudgetListSubject.value;
  }

  updateListItem(updateEvent: UpdateEvent) {
    this.currentBudgetListSubject[this.currentBudgetListSubject.getValue().indexOf(updateEvent.old)] = updateEvent.new;
    let item: BudgetItemInterface[] = [{
      description: updateEvent.new.description,
      amount: updateEvent.new.amount
    }];

    this.currentBudgetListSubject.next(item);
    return this.currentBudgetListSubject.value;
  }

  deleteItemFromList(item: BudgetItemInterface): BudgetItemInterface[] {
    let index = this.currentBudgetListSubject.value.indexOf(item);
    return this.currentBudgetListSubject.value.splice(index, 1);
  }

  getBudget(): number {
    return this.currentBudgetSubject.value;
  }

  setBudget(amount: number): number {
    this.currentBudgetSubject.next(this.currentBudgetSubject.value + amount);
    return this.currentBudgetSubject.value;
  }
}