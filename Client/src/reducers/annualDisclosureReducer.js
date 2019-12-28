const initialState = {
    isSaved: false,
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SAVE_ANNUALDISCLOSURE":
            return {
                ...state,
                isSave:true 
                
            };
            case "GET_ANNUALDISCLOSURE":
            return {
                ...state,
                data:action.payload
                
            };
        default:
            return state;
    }
}
