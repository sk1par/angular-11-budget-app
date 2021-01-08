import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetItemInterface } from 'src/shared/models/budget.interface';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public item: BudgetItemInterface
  ) { }

  ngOnInit(): void {
  }

  onSubmit(updatedItem: BudgetItemInterface) {
    this.dialogRef.close(updatedItem);
  }

}
