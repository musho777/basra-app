import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorConfirmCode, ErrorGetBaners, ErrorGetUser, ErrorGetstoryes, ErrorLogin, ErrorUpdateUser, ErrorUpdateUserAvatar } from "./errorAction";
import { StartConfrimCode, StartGetBaners, StartGetStoryes, StartGetUser, StartLogin, StartUpdateProfil, StartUpdateUserAvatar } from "./startAction";
import { SetToken, SuccessConfirmCode, SuccessGetBaners, SuccessGetFirstBaners, SuccessGetStoryes, SuccessGetUser, SuccessLogin, SuccessUpdateUser, SuccessUpdateUserAvatar } from "./successAction";

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

export const UpdateData = (data, token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
    };
    return (dispatch) => {
        dispatch(StartUpdateProfil())
        fetch(`${api}/update_user_info`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessUpdateUser(r))
                }
                else {
                    dispatch(ErrorUpdateUser())
                }
            })
            .catch((error) => {
                dispatch(ErrorUpdateUser())
            });
    }
}

export const UpdateUserAvatar = (url, token) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('Authorization', `Bearer ${token}`);
    let body = new FormData();
    body.append('avatar', {
        uri: url,
        name: 'avatar.png',
        filename: 'imageName.png',
        type: 'image/png',
    });
    body.append('Content-Type', 'image/png');
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
    };
    return (dispatch) => {
        dispatch(StartUpdateUserAvatar())
        fetch(`${api}/update_user_avatar`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(GetAuthUser(token))
                    dispatch(SuccessUpdateUserAvatar(r))
                }
                else {
                    dispatch(ErrorUpdateUserAvatar())
                }
            })
            .catch((error) => {
                dispatch(ErrorUpdateUserAvatar())
            });
    }
}

export const GetStoryes = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return (dispatch) => {
        dispatch(StartGetStoryes())
        fetch(`${api}/get_story`, requestOptions)
            .then((r) => r.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessGetStoryes(r))
                }
                else {
                    dispatch(ErrorGetstoryes())
                }
            })
            .catch((error) => {
                dispatch(ErrorGetstoryes())
            });
    }
}

export const GetBaners = (type, token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    return (dispatch) => {
        dispatch(StartGetBaners())
        fetch(`https://basrabackend.justcode.am/api/app/get_banner?slider=${type}`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    if (type === 'first') {
                        dispatch(SuccessGetFirstBaners(r))
                    }
                    else {
                        dispatch(SuccessGetBaners(r))
                    }
                }
                else {
                    dispatch(ErrorGetBaners())
                }
            })
            .catch(error => {
                dispatch(ErrorGetBaners())
            });
    }

}