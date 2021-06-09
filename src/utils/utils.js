export const baseUrl = "https://norma.nomoreparties.space/api";
export const headers = {
  "Content-Type": "application/json",
};

export const checkError = async (res) => {
  if (res.ok) {
    return res.json();
  }
  await res
    .text()
    .then((text) => {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    })
    .then((text) => {
      return Promise.reject(text.message || text.error || text);
    });
};
