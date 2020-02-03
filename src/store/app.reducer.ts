import * as fromShoppingList from '../app/shopping-list/shopping-list.reducer';
import * as fromAuth from '../app/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer
}