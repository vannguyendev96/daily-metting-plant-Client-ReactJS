import axios from 'axios';

import {
    AUTH_SIGN_IN,
    AUTH_SIGN_IN_ERROR } from './types';

import { URL_API } from '../constant';

export const Login = (email,password) =>{
    return async dispatch => {
        try {
            const res = await axios.post(URL_API + 'users/signin',{
                email:email,
                password:password,
                username: 'DMS'
            })
            console.log(res)
            if(res.status === 200){
                if(res.data.isJoi === true)
                {
                    dispatch({
                        type: AUTH_SIGN_IN_ERROR,
                        payload: 'Email hoặc password không đúng'
                    })
                }
                else{
                    dispatch({
                        type: AUTH_SIGN_IN,
                        payload: res.data.userid
                    })
                    localStorage.setItem('token',res.data.token);
                }
                // if(res.data.token !== undefined && res.data.isJoi === false){
                //     console.log(res)
                //     dispatch({
                //         type: AUTH_SIGN_IN,
                //         payload: res.data.userid
                //     })
                //   }
                //   else{
                //     dispatch({
                //         type: AUTH_SIGN_IN_ERROR,
                //         payload: 'Email hoặc password không đúng'
                //     })
                //   }
            }         

            
        } catch (error) {
            dispatch({
                type: AUTH_SIGN_IN_ERROR,
                payload: 'Email hoặc password không đúng'
            })
        }

    }
}