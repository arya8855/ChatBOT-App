import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Spinner"
import { checkLocalStorage } from "../redux/slice/user-slice"


const PrivateRoute = ({ element, mode }) => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)

   useEffect(() => {
    dispatch(checkLocalStorage())
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  // If user is logged in, restrict Auth pages (Sign In / Sign Up)
  if (mode === "Auth" && user) {
    return <Navigate to="/app" replace />
  }

  // If user is NOT logged in, restrict Private pages
  if (mode === "Private" && !user) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return element
}

export default PrivateRoute;