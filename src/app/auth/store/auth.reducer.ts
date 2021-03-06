import { User } from '../user.model'
import * as AuthActions from './auth.action';


export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState = {
    user: null,
    authError: null,
    loading: false
}

export function AuthReducer(
    state: State = initialState, 
    action: AuthActions.AuthAction) {

    switch(action.type) {
        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                authError: null,
                loading: false
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        default:
            return {
                ...state
            }

    }

}