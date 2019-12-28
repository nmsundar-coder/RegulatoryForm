export const addImmediateRelative = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "ADD_IMMEDIATERELATIVE",
        payload: postData
    })

}

export const updateImmediateRelative = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "UPDATE_IMMEDIATERELATIVE",
        payload: postData
    })

}

export const deleteImmediateRelative = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "DELETE_IMMEDIATERELATIVE",
        payload: postData
    })

}