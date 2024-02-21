import * as actionTypes from "../constants/member"

const handleSignin = (data) => ({
    type: actionTypes.USER_LOGIN,
    data: data
})
const handleSigninWithTwo2Fa = (data) => ({
    type: actionTypes.USER_LOGIN,
    data: data
})
const handleSignout = () => ({
    type: actionTypes.USER_RESET
})

const handleUpdateDetail= (data) => ({
    type: actionTypes.USER_DETAILS_UPDATE,
    data: data
})

export {
    handleSignin,
    handleSignout,
    handleUpdateDetail,
    handleSigninWithTwo2Fa
}