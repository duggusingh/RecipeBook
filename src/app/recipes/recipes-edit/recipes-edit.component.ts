import { Component, OnInit } from "@angular/core";
import { ActivatedRoute ,Router} from "@angular/router";
import { Params } from "@angular/router";
import { FormGroup, FormControl, FormArray,Validators } from "@angular/forms";
import { RecipesService } from "./../recipes.service";

@Component({
  selector: "app-recipes-edit",
  templateUrl: "./recipes-edit.component.html",
  styleUrls: ["./recipes-edit.component.css"]
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode: false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router:Router,private routes:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"];
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name,Validators.required),
              'amount': new FormControl(ingredients.amount,Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagePath: new FormControl(recipeImagePath,Validators.required),
      description: new FormControl(recipeDescription,Validators.required),
      ingredients: recipeIngredients
    });
  }
  onSubmit() {
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
       this.recipeService.addRecipe(this.recipeForm.value);
    }
  }
  onSubmits()
{
        (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup(
          {
           'name': new FormControl(null,Validators.required),
           'amount':new FormControl(null,Validators.required)
          }
        )
        )
}
onClear(){
  this.router.navigate(['../'],{relativeTo:this.routes});
}
onCut(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
// cross(){
//   this.recipeForm.get('ingredients').reset(new FormGroup(
//           {
//            'name': new FormControl(),
//            'amount':new FormControl()
//           }
//         ),1);
// }
}
