const initialState = {
    immediateRelatives: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "ADD_IMMEDIATERELATIVE":
        return {
          ...state,
          immediateRelatives:action.payload
        };
        case "UPDATE_IMMEDIATERELATIVE":
        return {
          ...state,
          immediateRelatives:action.payload.dataSource
        };
        case "DELETE_IMMEDIATERELATIVE":
        return {
          ...state,
          immediateRelatives:action.payload.dataSource
        };
        case "VIEW_IMMEDIATERELATIVE":
        return {
          ...state,
          immediateRelatives:action.payload
        };
      default:
        return state;
    }
  }
  