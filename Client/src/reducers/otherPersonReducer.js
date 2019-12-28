const initialState = {
    otherPersons: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "ADD_OTHERPERSON":
        return {
          ...state,
          otherPersons:action.payload
        };
        case "UPDATE_OTHERPERSON":
        return {
          ...state,
          otherPersons:action.payload.dataSource
        };
        case "DELETE_OTHERPERSON":
        return {
          ...state,
          otherPersons:action.payload.dataSource
        };
        case "VIEW_OTHERPERSON":
        return {
          ...state,
          otherPersons:action.payload
        };
      default:
        return state;
    }
  }
  