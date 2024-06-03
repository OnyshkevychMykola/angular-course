import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {IMAGE_LINK} from "../constants";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>()
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

  recipeSelector = new Subject<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
      return this.recipes[id];
  }

  addRecipeToListIngredient(ingredient: Ingredient[]) {
    this.service.onAddIngredients(ingredient)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number,recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
