import {Ingredient} from '../shared/ingredient.model';


import { Subject } from 'rxjs/Subject';
export class ShoppingListService{
    
   private ingredients:Ingredient[]=[
  new Ingredient('Apple',50),
  new Ingredient('Mango',80)

];
startedEditing=new Subject<number>();
getIngredients()
{
    return this.ingredients;
}
getIngredient(index)
{
    return this.ingredients[index];
}
addIngredient(ingredient:Ingredient){
 this.ingredients.push(ingredient); 
}
deleteIngredient(index:number){
    this.ingredients.splice(index,1); 
    
}

addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
}
updateIngredient(index:number,newIngredient:Ingredient)
{
       this.ingredients[index]=newIngredient;
    

}
}
