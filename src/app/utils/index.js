export function appendArrayToUrl(url, arrParams, key) {
  const params = arrParams.map((elem, index) => `${key}[${index}]=${elem}`);

  const queryPrefix = url.includes("?") ? "&" : "?";
  const regionQueryString = params.join("&");

  return `${url}${queryPrefix}${regionQueryString}`;
}

export function appendParamToUrl(url, paramName, paramValue) {
  const queryPrefix = url.includes("?") ? "&" : "?";
  const param = `${paramName}=${paramValue}`;
  return `${url}${queryPrefix}${param}`;
}
