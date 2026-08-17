import { all } from 'redux-saga/effects'
import { authSaga } from './auth/sagas'

export default function* rootSaga(): any {
  yield all([authSaga()])
}
