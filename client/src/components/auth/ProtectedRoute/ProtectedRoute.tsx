import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Spinner from "../../layout/Spinner/Spinner"
// import { loadUser } from "../../../redux/api/apiAuthRequest"

const ProtectedRoute = () => {
    const { isFetching, isAuthenticated } = useSelector((state: any) => state.auth.auth)

    if(isFetching)
        return (
            <Spinner/>
        )
    return (
        isAuthenticated ?
        <Outlet/> : <Navigate to='/login' /> 
    )
}

export default ProtectedRoute