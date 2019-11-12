import { Component, OnInit,Input } from '@angular/core';
import {Recipe} from '../recipe.model';
import{RecipesService} from '../recipes.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 recipe:Recipe;
id:number;
  constructor(private recipeSer:RecipesService,private routes:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params:Params)=> {
       this.id= +params['id'];
   this.recipe = this.recipeSer.getIndex(this.id);
    }
    );
  }
  onAddRecipe(){
    this.recipeSer.onAddShopping(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.routes});
  }
  onDeleteRecipe(index:number)
  {
    this.recipeSer.onDeleteRecipe(this.id);
    this.router.navigate(['./recipes']);
  }

}
