import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
  ingredientChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[]=[
    new Ingredient('Apple', 455),
    new Ingredient('Tomato', 345),
  ];

  onAddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChange.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChange.emit(this.ingredients)
  }

}
