import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput',  {static: false}) amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }
  ngOnInit() {
  }

  addShopping() {
    const nameVal = this.nameInput.nativeElement.value;
    const amountVal = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(nameVal, amountVal);
    this.shoppingListService.onAddIngredient(newIngredient);
  }
}
