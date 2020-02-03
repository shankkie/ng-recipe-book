import { Ingredient } from './../shared/ingredient.model';
import { Action } from '@ngrx/store';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';


export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor( public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor( public payload:  Ingredient[] ) {}
}

export class UpdateIngredient implements Action {
  readonly type  = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = REMOVE_INGREDIENT;
  constructor() {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit {
  readonly type = STOP_EDIT;
}


export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit