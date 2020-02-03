import { AppState } from './../../store/app.reducer';
import * as  ShoppingListActions from './shopping-list.action';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;


  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    this.ingredients = (this.store.select('shoppingList'));
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
