import { Component, OnInit, EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients:Ingredient[];
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
  }
// onIngredientAdded(ingredient:Ingredient){
//   this.ingredients.push(ingredient);
  onEditItem(index:number)
  {
    this.slService.startedEditing.next(index);
  }
}



