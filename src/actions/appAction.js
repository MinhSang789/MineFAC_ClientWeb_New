import * as actionTypes from "../constants/app"

export const handleGetAppConfigurationSuccess = (data) => ({
    type: actionTypes.FETCH_APP_CONFIGURATION_SUCCESS,
    data: data
})

export const handleInit = () => ({
    type: actionTypes.INIT_FINISH,
})