import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit{
  recipe: Recipe;
  id : number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(){
    this.route.params.subscribe((
      params: Params
    ) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  addToShoppingList() {
    this.recipeService.addRecipeToListIngredient(this.recipe.ingredients)
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
