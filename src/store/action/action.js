import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorConfirmCode, ErrorGetUser, ErrorLogin } from "./errorAction";
import { StartConfrimCode, StartGetUser, StartLogin } from "./startAction";
import { SetToken, SuccessConfirmCode, SuccessGetUser, SuccessLogin } from "./successAction";

let api = 'https://basrabackend.justcode.am/api/app'
export const LoginAction = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
    };
    return (dispatch) => {
        dispatch(StartLogin())
        fetch(`${api}/login`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessLogin(r))
                }
                else {
                    dispatch(ErrorLogin())
                }
            })
            .catch((error) => {
                dispatch(ErrorLogin())
            });
    }
}

export const ConfrimCode = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
    };
    return (dispatch) => {
        dispatch(StartConfrimCode())
        fetch(`${api}/confirm_login`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    AsyncStorage.setItem('token', r.token)
                    dispatch(SetToken(r.token))
                    dispatch(SuccessConfirmCode(r))
                }
                else {
                    dispatch(ErrorConfirmCode())
                }
            })
            .catch((error) => {
                dispatch(ErrorConfirmCode())
            });
    }
}

export const GetAuthUser = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return (dispatch) => {
        dispatch(StartGetUser())
        fetch(`${api}/auth_user_info`, requestOptions)
            .then((r) => r.json())
            .then(r => {
                // if (r.status) {
                dispatch(SuccessGetUser(r))
                // }
                // else {
                // dispatch(ErrorGetUser())
                // }
            })
            .catch((error) => {
                dispatch(ErrorGetUser())
            });
    }
}