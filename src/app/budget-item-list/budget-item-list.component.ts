import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';

export interface UpdateEvent {
  old: BudgetItemInterface,
  new: BudgetItemInterface
}

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit, OnDestroy {
  budgetItems: BudgetItemInterface[];
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
  budgetItemsSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.budgetItemsSubscription = this.budgetService.currentBudgetList.subscribe(budgetResult => {
      this.budgetItems = budgetResult;
    });
  }

  onDeleteButtonClick(item: BudgetItemInterface) {
    this.budgetService.deleteItemFromList(item);
    this.budgetService.setBudget(-item.amount);
  }

  onCardClicked(item: BudgetItemInterface) {
    // show the edit modal
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      // check if result has a value
      if (result) {
        this.update.emit({
          old: item,
          new: result
        });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.budgetItemsSubscription.unsubscribe();
  }

}
