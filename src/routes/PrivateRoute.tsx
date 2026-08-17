import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchSignInRequest } from '../redux/stores/auth/actions'
import { RootState } from '../redux/stores'

interface PrivateRouteProps {
  component: React.ComponentType<any>
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component
}) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)

  return isAuth ? <Component /> : <AuthRedirect />
}

const AuthRedirect: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(dispatchSignInRequest())
  }, [dispatch])

  return <div>Redirecting...</div>
}
