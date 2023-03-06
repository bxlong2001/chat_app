import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Spinner from "../../layout/Spinner/Spinner"
import Login from "../Login/Login"
import Register from "../Register/Register"

const Auth: React.FC<{authRoute: string}> = (props) => {
    const { isFetching, isAuthenticated } = useSelector((state: any) => state.auth.auth)
    let body

    if (isFetching)
        body = (
            <Spinner/>
        )
    else if (isAuthenticated)
        body = (
            <Navigate to='/messages' />
        )
    else
        body = (
            <>
                {props.authRoute === 'login' && <Login />}
                {props.authRoute === 'register' && <Register />}
            </>
        )

    return (
        <div className='wallpaper'>
        <div className='dark-overlay'>
            <div className='wrap'>
                {body}
            </div>
        </div>
    </div>
    )
}

export default Auth