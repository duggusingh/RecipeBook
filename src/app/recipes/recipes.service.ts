import {Recipe} from './recipe.model';
import {EventEmitter,Output,Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService
{
  constructor(private slService:ShoppingListService){}
   @Output() recipeSelected= new EventEmitter<Recipe>();
recipes: Recipe[]=[
  new Recipe('Rasgullah','It is very delicious','http://images.mapsofindia.com/my-india/Rasgulla-665x453.jpg',
  [
    new Ingredient('Wheat',20),
    new Ingredient('Sugar',10)
  ]),
  new Recipe('Dosa','It is very tasty','http://www.mustgaze.com/wp-content/uploads/2017/07/Dosa-or-Dosai.png',[
    new Ingredient('Mayda',67),
    new Ingredient('Sambhar',2)
  ]),
  new Recipe('Idli','It is just wow','http://images.mapsofindia.com/my-india/Idli-Sambhar.jpg',[
      new Ingredient('Rice',67),
    new Ingredient('Chatni',25)
  ])
];
getRecipes()
{
    return this.recipes;
}
onAddShopping(ingredient:Ingredient[]){
  this.slService.addIngredients(ingredient);

}
getIndex(index:number)
{
  return  this.recipes[index];
}
getRecipe(id:number)
{
return this.recipes[id];
}
addRecipe(recipe:Recipe){
  this.recipes.push(recipe);
}
updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index]=newRecipe;
}
onDeleteRecipe(index:number){
  this.recipes.splice(index,1);
}
}
