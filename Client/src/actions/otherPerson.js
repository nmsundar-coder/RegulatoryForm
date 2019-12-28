export const addOtherPerson = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "ADD_OTHERPERSON",
        payload: postData
    })

}

export const updateOtherPerson = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "UPDATE_OTHERPERSON",
        payload: postData
    })

}

export const deleteOtherPerson = postData => dispatch => {

    console.log(postData)
    dispatch({
        type: "DELETE_OTHERPERSON",
        payload: postData
    })

}