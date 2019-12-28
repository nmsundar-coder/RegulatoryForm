import rest from "../utils/rest";
import config from "../config";

export const saveAnnualDisclosure = postData => dispatch => {

    console.log(postData)

    return new Promise((resolve, reject) => {
        console.log(postData);
        rest
          .post("annualDisclosure/submit", postData)
          .then(res => {
            // Save to localStorage
            const { token, success } = res.data;
            // Set current user
            dispatch({
                type: "SAVE_ANNUALDISCLOSURE",
                payload: true
            });
            resolve(res);
          })
          .catch(err => {
            dispatch({
                type: "SAVE_ANNUALDISCLOSURE",
                payload: false
            });
            reject(err);
          })
          .then(function() {
          });
      });
    };

    export const getAnnualDisclosure = () => dispatch => {

      console.log("Testtt")
      return new Promise((resolve, reject) => {
          rest
            .get("annualDisclosure/")
            .then(res => {
              // Save to localStorage
              const { token, success } = res.data;
              // Set current user
              dispatch({
                  type: "GET_ANNUALDISCLOSURE",
                  payload: res.data
              });
              resolve(res);
            })
            .catch(err => {
              dispatch({
                  type: "GET_ANNUALDISCLOSURE",
                  payload: false
              });
              reject(err);
            })
            .then(function() {
            });
        });
      };
  