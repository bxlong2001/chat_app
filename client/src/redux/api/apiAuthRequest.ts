import { LoginForm, RegisterForm } from './../../interface';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../constains'
import { authFailed, authStart, authSuccess, logoutSuccess } from '../slice/authSlice'
import axios from 'axios'
import setAuthToken from '../../components/auth/Auth/setAuthToken';

export const registerUser = async (registerForm: RegisterForm, dispatch: any) => {
    dispatch(authStart())
    try {
        const response = await axios.post(apiUrl + 'auth/register', registerForm)
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            setAuthToken(response.data.accessToken)
            dispatch(authSuccess(response.data.user))
        }else {
            dispatch(authFailed())
        }
    } catch (error: any) {
        dispatch(authFailed())
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}
export const loginUser = async (loginForm: LoginForm, dispatch: any) => {
    dispatch(authStart())
    try {
        const response = await axios.post(apiUrl + 'auth/login', loginForm)
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            setAuthToken(response.data.accessToken)
            dispatch(authSuccess(response.data.user))
        }else {
            dispatch(authFailed())
        }
    } catch (error: any) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const logoutUser = async (dispatch: any) => {
    dispatch(logoutSuccess())
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    setAuthToken('')
}