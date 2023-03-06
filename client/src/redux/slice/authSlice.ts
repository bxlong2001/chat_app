import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            user: null,
            isAuthenticated: false,
            isFetching: false,
            error: false
        }
    },
    reducers:{
        // login/register
        authStart: (state) => {
            state.auth.isFetching = true
        },
        authSuccess: (state, action) => {
            state.auth.isFetching = false
            state.auth.user = action.payload
            state.auth.isAuthenticated = true
            state.auth.error = false
        },
        authFailed: (state) => {
            state.auth.isAuthenticated = false
            state.auth.isFetching = false
            state.auth.error = true
        },
        
        //logout
        logoutSuccess: (state) => {
            state.auth.isAuthenticated = false
            state.auth.user = null
        }
    }
})

export const {
    authStart,
    authFailed,
    authSuccess,
    logoutSuccess
} = authSlice.actions
export default authSlice.reducer