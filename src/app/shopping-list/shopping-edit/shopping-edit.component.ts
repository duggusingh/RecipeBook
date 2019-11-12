import { Component, OnInit,ViewChild,EventEmitter,Output,OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
// @ViewChild('nameInput',{static:false}) nameRef: ElementRef
// @ViewChild('amountInput',{static:false}) amountRef: ElementRef;
subscription:Subscription;
 @ViewChild('local',{static:false}) localRef:NgForm;
 editMode=false;
 editIndex:number;
 editIngr:Ingredient;

// @Output() ingredientAdded=new EventEmitter<Ingredient>();
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.slService.getIngredients();
 this.subscription=this.slService.startedEditing.subscribe((index:number)=>{
      this.editMode=true;
      this.editIndex=index;
      this.editIngr=this.slService.getIngredient(index);
    this.localRef.setValue({
      name: this.editIngr.name,
      amount: this.editIngr.amount
    })
    }
    );}
onAddItem(form:NgForm){
  // const ingName= this.nameRef.nativeElement.value;
  // const ingAmount= this.amountRef.nativeElement.value;
  const value=form.value;


    const newIngredient =new Ingredient(value.name,value.amount);
    if(this.editMode)
    {
       this.slService.updateIngredient(this.editIndex,newIngredient);
    }
    else{
   this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
    // this.ingredientAdded.emit(newIngredient);
   
}
deleteIngredients(){
  // const ingName= this.nameRef.nativeElement.value;
  // const ingAmount= this.amountRef.nativeElement.value;
  //   const newIngredient =new Ingredient(ingName,ingAmount);
  this.slService.deleteIngredient(this.editIndex);
}
clearIngredient(){
  // //  const ingName= this.nameRef.nativeElement.value;
  // // const ingAmount= this.amountRef.nativeElement.value;
  // //   const newIngredient =new Ingredient(ingName,ingAmount);
  // this.slService.clearIngredient(newIngredient);
  this.localRef.reset();
  this.editMode=false;
}
ngOnDestroy()
{
  this.subscription.unsubscribe();
}
}
