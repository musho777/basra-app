const initialState = {
    data: [],
    status: false,
    loading: true,
    error: ""
};
export const getPadborkiIdReducer = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetPadborkiId':
            temp.data = []
            temp.status = false
            temp.loading = true
            temp.error = ''
            break;
        case 'SuccessGetPadborkiId':
            temp.data = action.data
            temp.status = true
            temp.loading = false
            temp.error = ''
            break
        case 'ErrorGetPadborkiId':
            temp.data = ''
            temp.status = false
            temp.loading = false
            temp.error = 'error'
            break
        case 'ClearGetPadbord':
            temp.data = []
            temp.status = false
            temp.loading = false
            temp.error = ''
            break
        default:
            return temp;
    }
    return temp;
} 