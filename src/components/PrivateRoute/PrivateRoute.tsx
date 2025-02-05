import { useSelector } from 'react-redux'
import { getAuthSelector } from '../../redux/selectors'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth: any = useSelector(getAuthSelector)
  const { logout } = useAuth0()
  const navigate = useNavigate()
  useEffect(() => {
    if (auth && auth?.isAuthenticated === false) {
      // đồng bộ logout với auth0
      logout({ logoutParams: { returnTo: `${window.location.origin}/login` } })
      navigate('/login')
    }
  }, [auth.isAuthenticated])
  if (auth.isAuthenticated === false) {
    return null
  }
  return <>{children}</>
}

export default PrivateRoute
