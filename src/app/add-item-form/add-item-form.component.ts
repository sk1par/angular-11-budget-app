import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {
  @Input() item: BudgetItemInterface;
  @Output() formSubmit: EventEmitter<BudgetItemInterface> = new EventEmitter<BudgetItemInterface>();
  isNewItem: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
    // if item has a value
    if (this.item) {
      // this means that an existing item object was passed into this component
      // this is not a new item
      this.isNewItem = false;
    } else {
      this.isNewItem = true;
      this.item = {
        description: '',
        amount: null
      }
    }
  }

  onSubmit(form: NgForm): void {
    this.formSubmit.emit(form.value);
    // this.budgetService.addItemToList(form.value);
    form.reset();
  }

}
