import { baseUrl, checkError, headers } from "./utils";

export const getData = () => {
  return fetch(`${baseUrl}/ingredients`, {
    headers: headers,
  }).then(checkError);
};

export const postOrder = (data) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};
