import { baseUrl, checkError, headers } from "./utils";

export const getData = () => {
  return fetch(baseUrl, {
    headers: headers,
  }).then(checkError);
};
