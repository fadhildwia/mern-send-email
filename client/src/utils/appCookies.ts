import Cookies from 'js-cookie';

interface GetCookieInterface {
  name: 'access_token'
}

interface SetCookieInterface extends GetCookieInterface {
  value: string;
  options?: Cookies.CookieAttributes;
}
export const appCookies = () => {
  const setCookie = async ({ name, value, options }: SetCookieInterface) =>
    Cookies.set(name, value, options);
  const removeCookie = async ({ name }: GetCookieInterface) => Cookies.remove(name);
  const getCookie = async ({ name }: GetCookieInterface) => Cookies.get(name);

  return {
    setCookie,
    removeCookie,
    getCookie
  };
};
