import { Action } from '@ngrx/store';


export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class AuthLogin implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}){}

}
export class AuthLogout implements Action {
    readonly type = LOGOUT
    constructor(){}
}

export class AuthLoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}){}
}

export class AuthLoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) {}
}


export type AuthAction = AuthLogin | AuthLogout | AuthLoginStart | AuthLoginFail