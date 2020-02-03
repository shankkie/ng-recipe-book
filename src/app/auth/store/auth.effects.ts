import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth.service';
import { of } from 'rxjs';
import * as fromApp from '../../../store/app.reducer'

@Injectable()
export class AuthEffects {

    constructor(private http: HttpClient, private actions$: Actions, private route: Router) {}
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap( (authData: AuthActions.AuthLoginStart) => {
            return this.http
            .post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
                }
            )
            .pipe(
                map( resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return new AuthActions.AuthLogin({
                        email: resData.email, 
                        userId: resData.localId, 
                        token: resData.idToken,
                        expirationDate
                    })
                }),
                catchError( errorRes => {
                    let errorMessage = 'An unknown error occurred!';
                    if (!errorRes.error || !errorRes.error.error) {
                        return of(new AuthActions.AuthLoginFail(errorMessage));
                    }
                    switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exist.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not correct.';
                        break;
                    }
                    return of( new AuthActions.AuthLoginFail(errorMessage))
                })
            )
        } )
    )

    @Effect({ dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap( () => {
            this.route.navigate(['/']);
        })
    )

}