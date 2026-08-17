import { call, cancel, fork, put, take } from 'redux-saga/effects'
import apiServices from '../../../../services/api-service/apiService'
import { logger } from '../../../../helpers/logger'
import {
  OAUTH_SIGN_IN_FAILURE,
  OAUTH_SIGN_IN_SUCCESS,
  SIGN_IN_EMAIL_REQUEST,
  SIGN_IN_FACEBOOK_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_GOOGLE_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_REQUEST,
  SIGN_UP_EMAIL_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from '../actions'

export function* signInFlow(): any {
  while (true) {
    const signInAction: any = yield take([
      SIGN_IN_EMAIL_REQUEST,
      SIGN_UP_EMAIL_REQUEST
    ])

    let signInTask: any
    let OAuthAction: any
    switch (signInAction.type) {
      case SIGN_IN_EMAIL_REQUEST:
        signInTask = yield fork(
          signInROPC,
          signInAction.payload.email,
          signInAction.payload.password
        )
        break
      case SIGN_UP_EMAIL_REQUEST:
        signInTask = yield fork(
          signUpROPC,
          signInAction.payload.email,
          signInAction.payload.password
        )
        break
      case SIGN_IN_GOOGLE_REQUEST:
        signInTask = yield fork(signInGoogle)
        break
      case SIGN_IN_FACEBOOK_REQUEST:
        signInTask = yield fork(signInFacebook)
        OAuthAction = yield take([OAUTH_SIGN_IN_SUCCESS, OAUTH_SIGN_IN_FAILURE])

        if (OAuthAction.type === OAUTH_SIGN_IN_SUCCESS) {
          logger('OAuth sign in success')
        }
        break
    }

    const actions: any = yield take([
      SIGN_IN_SUCCESS,
      SIGN_IN_FAILURE,
      SIGN_UP_SUCCESS,
      SIGN_UP_FAILURE,
      SIGN_OUT_REQUEST
    ])
    switch (actions.type) {
      case SIGN_IN_SUCCESS:
        break
      case SIGN_IN_FAILURE:
        break
      case SIGN_UP_SUCCESS:
        break
      case SIGN_UP_FAILURE:
        break
      case SIGN_OUT_REQUEST:
        yield cancel(signInTask)
        break
    }
  }
}

export function* signOutFlow(): any {
  while (true) {
    yield take(SIGN_OUT_REQUEST)
    yield call(signOut)
    yield put({ type: SIGN_OUT })
  }
}

function* signInROPC(email: string, password: string): any {
  // Call sign in API
}

function* signUpROPC(email: string, password: string): any {
  // Call sign up API
}

function* signInGoogle(): any {
  // Call sign in Google
}

function* signInFacebook(): any {
  // Call sign in Facebook
}

function* signOut(): any {
  try {
    yield call(apiServices.postData, '/logout')
  } catch (error) {
    // Handle error silently
  }
}
