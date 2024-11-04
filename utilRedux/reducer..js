// reducers.js
import { CREATE_TASK_SUCCESS, DELETE_TASK_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS, UPDATE_TASK_SUCCESS } from './action';


const initialState = {
    data: [],
    error: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                data: state.data.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                data: state.data.filter(task => task.id !== action.payload),
            };
        default:
            return state;
    }

};

export default rootReducer;