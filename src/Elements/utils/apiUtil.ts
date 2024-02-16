import axios, {
  AxiosHeaders,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
} from "axios";
import { APIError, NetworkError } from "./ErrorUtil";
import { Logger } from "./Logger";
import { config as ApiConfig } from "./config";
import { signOut } from "./utils";
import { useQueryClient } from "@tanstack/react-query";
// import { signOut } from "./utils";
// import React from "react";
// import { UserActivityTracker } from "./UpdateActivityTracker";

// import { useQueryClient } from 'react-query';
// import { apiConfig } from '../../config';
// import configs from '../configs';
// import { signOut } from './axiosIntercept';
// import { store } from '../stores'

// export const fetchApi = async (
//         url: string,
//         methodtype: Method = 'post',
//         header: undefined | AxiosRequestHeaders = { 'content-Type': 'application/json' },
//         body1 = null
// ): Promise<AxiosResponse> => {
//     const config: AxiosRequestConfig = {
//         url,
//         method: methodtype,
//         headers: header,
//         data: body1
//     };

//     return axios(config)
//     .then((response: unknown) =>

//     // Logger.log('apiUtil:', response)
//         response
//     )
//     .catch(async (error: { response: { data: { code: number | undefined; message: string | null | undefined; }; }; }) => {
//         Logger.log('apiUtil:', JSON.stringify(error));

//         // openAlert({ body: error.message, type: 'error', title: 'API Failed' })
//         if (error instanceof NetworkError) {
//             return error.response;
//         }
//         if (error?.response?.data?.code === 401) {
//             // await signOut();

//             return null;
//         }
//         throw new APIError(
//         error?.response?.data?.message || 'Status failed',
//         error?.response?.data?.code
//         );
//     });
// };

export const fetchAxios = (options: AxiosRequestConfig): AxiosPromise => {
  const baseUrl = ApiConfig.PROD_URL();
  const config: AxiosRequestConfig = {
    ...options,
    url: checkIfUrl(options.url) ? options.url : baseUrl + options.url,
  };

  return axios(config);
};

// export const manageSession = () => {
//   if(updateTrackerRef && updateTrackerRef.current && updateTrackerRef.current?.props?.activeTime) {
//     const storedTime = updateTrackerRef.current?.props?.activeTime as unknown as number;
//     const currentTime = new Date() as unknown as number;
//     const timeDifference = currentTime - storedTime; // difference in milliseconds
//     const twentyMinutes = 20 * 60 * 1000; // 20 minutes in milliseconds
//     if (timeDifference > twentyMinutes) {
//       return signOut();
//   } else {
//       const getValues = localStorage.getItem('user') ? ((): {
//         email?: string;
//         refresh_token?: string 
//       } => {
//         try {
//           const item = localStorage.getItem('user');
//           if (item === null) {
//               return {
//                 email: undefined,
//                 refresh_token: undefined
//               };
//           }
//           return JSON.parse(item);
//       } catch (error) {
//           return {
//             email: undefined,
//             refresh_token: undefined
//           };
//       }
//       })() : {
//         email: undefined,
//         refresh_token: undefined
//       }
//       fetchAxios({
//         url: `refresh_token`,
//         method: 'POST',
//         data: Object.assign(getValues)
//       }).then(({data}) => {
//         if(updateTrackerRef.current?.props?.userFunc?.user) {
//         const getdata = data as {
//           id_token: string
//         }
//           const user = {
//             ...updateTrackerRef.current?.props?.userFunc?.user,
//             ...getdata
//           }

//           updateTrackerRef.current?.props?.userFunc?.setUser(user)
//         }

//       }).catch(() => {
//         window.location.replace('/')
//       })
//   }
//   }
// }

export const fetchApiQuery = async (
  url?: string,
  methodtype?: Method,
  header?: undefined | AxiosHeaders,
  body?: unknown
) => {
  const baseUrl = ApiConfig.PROD_URL();
  const config: AxiosRequestConfig = {
    // you need to return in your saveFormData scope also
    url: checkIfUrl(url) ? url : baseUrl + url,
    method: methodtype,
    headers: header,
    data: body,
  };

  return axios(config)
    .then((res: { data: unknown }) => res.data)
    .catch(
      async (error: {
        code?: string;
        response: {
          status: number;
          data: { message: string | null | undefined };
        };
      }) => {
        if (error instanceof NetworkError) {
          return error?.response;
        }
        if (error?.response?.status === 401 || error?.code === "ERR_NETWORK") {
          try {
            // manageSession();
            signOut()
          } catch (error) {
            Logger.error(error as Error);
          }
          return null;
        }
        throw new APIError(
          error?.response.data.message ?? "Request failed",
          error?.response.status,
          error?.response.data.message ?? "Request failed"
        );
      }
    );
};

export const fetchApiQueryPagination = async (
  url?: string,
  methodtype?: Method,
  header?: undefined | AxiosRequestHeaders,
  page?: number | string
): Promise<unknown> => {
  const config: AxiosRequestConfig = {
    // you need to return in your saveFormData scope also
    url,
    method: methodtype,
    headers: header,
    data: {
      page,
    },
  };

  return axios(config)
    .then((res: { data: unknown }) => res.data)
    .catch((error: unknown) => Logger.log(error));
};
export const useGetFetchQuery = (
  name: string
): Promise<unknown | undefined> | null | undefined => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData([name]);
};

/**
 * 描述
 * @date 2022-08-08
 * @param {any} accTkn:string
 * @returns {any}
 */
export function utilHeader(accTkn: string) {
  if (accTkn) {
    return {
      "content-type": "application/json",
      Authorization: `Bearer ${accTkn?.replace(/['"]+/g, "")}`,
    };
  }

  return {
    "content-type": "application/json",
  };
}

/**
 * Parses the query/search or fragment/hash parameters out of a specific URL and
 * returns them as a JS object.
 *
 * @param {URL} url - The URL to parse.
 * @param {boolean} dontParse - If falsy, some transformations (for parsing the
 * value as JSON) will be executed.
 * @param {string} source - If {@code 'search'}, the parameters will parsed out
 * of {@code url.search}; otherwise, out of {@code url.hash}.
 * @returns {Object}
 */
export function parseURLParams(
  urls: string,
  dontParse = false,
  source = "hash"
) {
  const url = new URL(urls);
  const paramStr = source === "search" ? url.search : url.hash;
  const params: { [key: string]: string } = {};
  const paramParts = (paramStr && paramStr.substr(1).split("&")) || [];

  // Detect and ignore hash params for hash routers.
  if (source === "hash" && paramParts.length === 1) {
    const firstParam = paramParts[0];

    if (firstParam.startsWith("/") && firstParam.split("&").length === 1) {
      return params;
    }
  }

  paramParts.forEach((part) => {
    const param = part.split("=");
    const key = param[0];

    if (!key) {
      return;
    }

    let value;

    try {
      value = param[1];

      if (!dontParse) {
        const decoded = decodeURIComponent(value)?.replace(/\\&/, "&");

        value = decoded === "undefined" ? undefined : JSON.parse(decoded);
      }
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
        Logger.error(e);
      }

      return;
    }
    params[key] = value;
  });

  return params;
}

export const checkIfUrl = (url?: string): boolean => {
  if (!url) {
    return false;
  }
  let ifUrl;

  try {
    ifUrl = new URL(url);
  } catch {
    ifUrl = null;
  }
  if (ifUrl && typeof ifUrl === "object") {
    return true;
  }

  return false;
};

/**
 *
 * @date 2022-08-05
 * @param {number} bytes
 * @returns {any}
 */
export function bytesToSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes == 0) {
    return "0 Byte";
  }
  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    10
  );

  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}

/**
 * Checks if Null or Undefined.
 * @date 2022-08-05
 * @param {any} value
 * @returns {any}
 */
export function isNullOrUndefined(value: unknown): boolean {
  return Boolean(value == null);
}

/**
 * Checks if string is empty.
 * @date 2022-08-05
 * @param {?string} str
 * @returns {any}
 */
export function isStringEmpty(str: string | null | unknown): boolean {
  return Boolean(typeof str === "string" && str.trim().length === 0);
}

/**
 * Checks if string is empty or Undefined or Null.
 * @date 2022-08-05
 * @param {?string} val
 * @returns {any}
 */
export function isNullOrUndefinedOrEmpty(val: unknown): boolean {
  return Boolean(isNullOrUndefined(val) || isStringEmpty(val));
}

// /**
//  * Checks if Null or Undefined and Empty String.
//  * @param {string} value
//  * @returns {boolean}
//  */
// export function checkNullAndEmptyString(value: string): boolean {
//     return isEmpty(value);
// }

export function getRegexVal(str: string, regex: RegExp, list_number: number) {
  const match = str.match(regex);

  if (match) {
    const value = match[list_number];

    return value;
  }

  return undefined;
}

export const isEven = (num: number) => (num + 1) % 2 === 0;

export function removeNullArr(array: any[]) {
  return array.filter(Boolean);
}

export function isObjectEmpty(value: Record<any,any>) {
  return Boolean(value && Object.keys(value).length === 0)
}
// export const updateTrackerRef = React.createRef<UserActivityTracker>();