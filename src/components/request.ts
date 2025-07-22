import { Methods, RequestMethodInit } from "../types";

const baseRequest = async (
  url: string,
  method: string,
  config?: RequestInit
) => {
  const response = await fetch(url, {
    method,
    ...config,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const prepareUrl = (
  baseUrl: string,
  endpoint: string,
  urlParams?: Record<string, string>,
  queryParams?: Record<string, string>
) => {
  let finalUrl = baseUrl + endpoint;
  if (urlParams) {
    finalUrl = finalUrl.replace(
      /{([^}]+)}/g,
      (match, key) => urlParams[key] || match
    );
  }
  if (queryParams) {
    const urlObj = new URL(finalUrl);
    Object.keys(queryParams).forEach((key) =>
      urlObj.searchParams.append(key, queryParams[key])
    );
    finalUrl = urlObj.toString();
  }
  return finalUrl;
};

const methods: Methods[] = ["get", "delete", "post", "put", "patch"];

export const req = (baseUrl: string, baseConfig?: RequestInit) => {
  const object = {} as { [key in Methods]: RequestMethodInit };

  methods.forEach((e) => {
    object[e] = async (endpoint, methodConfig, urlParams, queryParams) => {
      const finalUrl = prepareUrl(baseUrl, endpoint, urlParams, queryParams);
      return await baseRequest(finalUrl, e.toUpperCase(), {
        ...baseConfig,
        ...methodConfig,
      });
    };
  });

  return object;
};
