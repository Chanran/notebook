import queryString from 'query-string';

export function getQueryParam(key, str) {
  const parsedObj = queryString.parse(str || window.location.search);
  return parsedObj[key]
}