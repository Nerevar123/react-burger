import { DateTime } from "luxon";

export const baseUrl = "https://norma.nomoreparties.space/api";
export const headers = {
  "Content-Type": "application/json",
};

export const checkError = async (res: Response) => {
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

function isValidDate(date: string) {
  const dateWrapper = new Date(date);
  return !isNaN(dateWrapper.getDate());
}

export function formatDate(date: string) {
  if (!isValidDate(date)) return null;

  const oldDate = DateTime.fromISO(date);
  const timeZone = oldDate.offsetNameShort;
  const time = oldDate.toLocaleString(DateTime.TIME_24_SIMPLE);
  const day = oldDate.toRelativeCalendar();

  const newDate = `${day}, ${time} ${timeZone}`;

  return newDate;
}

export function setCookie(name: string, value: string | null, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value!);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
