const initialState = {
    data: [],
    status: false,
    loading: true,
    error: ""
};
export const getPadborkiWhiteProduct = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetPadborkiWhiteProducts':
            temp.data = []
            temp.status = false
            temp.loading = true
            temp.error = ''
            break;
        case 'SuccessGetPadborkiWhiteProducts':
            temp.data = action.data
            temp.status = true
            temp.loading = false
            temp.error = ''
            break
        case 'ErrorGetPadborkiwhteProducts':
            temp.data = ''
            temp.status = false
            temp.loading = false
            temp.error = 'error'
            break
        default:
            return temp;
    }
    return temp;
} 