import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  addToShoppingList() {
    this.recipeService.addRecipeToListIngredient(this.recipe.ingredients)
  }
}
