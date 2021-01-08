import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';
import { Subscription } from 'rxjs';
import { BudgetService } from '../services/budget.service';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  budgetItems: BudgetItemInterface[];
  totalBudget: number;
  $listSubscription: Subscription;
  $budgetSubscription: Subscription;

  constructor(
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    // let test: BudgetItemInterface[] = [{description: 'teasd', amount: 12}];
    // this.budgetService.addItemToList(test);

    this.$budgetSubscription = this.budgetService.currentBudget.subscribe(budget => {
      this.totalBudget = budget;
    });
    this.$listSubscription = this.budgetService.currentBudgetList.subscribe(result => {
      this.budgetItems = result;
    });
  }

  addItem(newItem: BudgetItemInterface) {
    let budgetItem = [{
      description: newItem.description,
      amount: newItem.amount
    }];

    this.budgetService.addItemToList(budgetItem);
    this.budgetService.setBudget(newItem.amount);
  }

  deleteItem(item: BudgetItemInterface) {
    this.budgetService.deleteItemFromList(item);
    this.budgetService.setBudget(-item.amount);
  }

  updateItem(updateEvent: UpdateEvent) {
    // update the item
    this.budgetService.updateListItem(updateEvent);

    // update the total amount
    this.budgetService.setBudget(-updateEvent.old.amount);
    this.budgetService.setBudget(+updateEvent.new.amount);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$budgetSubscription.unsubscribe();
    this.$listSubscription.unsubscribe();
  }
}
