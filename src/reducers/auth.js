import {
    AUTH_SIGN_IN,
    AUTH_SIGN_IN_ERROR } from '../actions/types';

const DEFAULT_STATE = {
    isAuthentication: false,
    userid: '',
    errorMessage:''
}

export default (state = DEFAULT_STATE,action) => {
    switch(action.type){
        case AUTH_SIGN_IN: 
            console.log('call sign in' + action.payload)
            return {...state,userid: action.payload,isAuthentication:true,errorMessage:''}
        case AUTH_SIGN_IN_ERROR:
            console.log('call sign in error')
            return {...state,errorMessage:action.payload}
        default:
            return state;
    }
}