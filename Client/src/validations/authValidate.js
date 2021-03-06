import _ from "lodash";
import lang from "../langs";

export const loginValidate = userData => {
  return new Promise((resolve, reject) => {
    let output = {};

    if (_.isEmpty(userData.username)) {
      output.username = lang("required.username");
    }

    if (_.isEmpty(userData.password)) {
      output.password = lang("required.password");
    }

    if (_.isEmpty(output)) {
      resolve(userData);
    } else {
      reject(output);
    }
  });
};
