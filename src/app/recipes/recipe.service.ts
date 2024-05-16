import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {IMAGE_LINK} from "../constants";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  constructor(private service: ShoppingListService) {
  }
  recipes: Recipe[] = [
    new Recipe('Test', 'descr', IMAGE_LINK, [
      new Ingredient(
        'New name',
        1244
      ),
      new Ingredient(
        'Hollister',
        56
      )
    ]),
    new Recipe('NewTest', 'new description', IMAGE_LINK,
      [
        new Ingredient(
          'sdf',
          5676
        ),
        new Ingredient(
          'w34',
          123
        )
      ]),
  ];

  recipeSelector = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipeToList(recipe: Recipe) {
   this.recipes.push(recipe);
  }

  addRecipeToListIngredient(ingredient: Ingredient[]) {
    this.service.onAddIngredients(ingredient)
  }
}
