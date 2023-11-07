export const SuccessLogin = () => {
    return {
        type: "SuccessLogin"
    }
}

export const SuccessConfirmCode = () => {
    return {
        type: 'SuccessConfirmCode'
    }
}

export const SuccessGetUser = (data) => {
    return {
        type: 'SuccessGetUser',
        data
    }
}

export const SetToken = (data) => {
    return {
        type: 'SetToken',
        data
    }
}

export const SuccessUpdateUser = () => {
    return {
        type: 'SuccessUpdateUser'
    }
}

export const SuccessUpdateUserAvatar = (data) => {
    return {
        type: 'SuccessUpdateUserAvatar',
        data
    }
}

export const SuccessGetStoryes = (data) => {
    return {
        type: 'SuccessGetStoryes',
        data
    }
}