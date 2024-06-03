import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }
  ngOnInit() {
    this.subscription =
      this.slService.startedEditing.subscribe(
        (i: number) => {
          this.editedItemIndex = i;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(i);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          })
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.slService.updateIngredient(
        this.editedItemIndex, newIngredient
      )
    } else {
      this.slService.onAddIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
