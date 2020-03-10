import {
    SET_ALERT,
    REMOVE_ALERT
} from "../types";

export default (state, action) => {
    console.log("AlertReducer:action.type:"+action.type);
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};
