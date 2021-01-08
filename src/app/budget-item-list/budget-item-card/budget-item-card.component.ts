import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})
export class BudgetItemCardComponent implements OnInit {
  @Input() item: BudgetItemInterface;
  @Output() xButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onXButtonClick(): void {
    // here we want to emit the event
    this.xButtonClick.emit();
  }

  onCardClick() {
    this.cardClick.emit();
  }

}
