import { getCookie } from './cookie.helper';

export function insertAccessToken() {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return '';

    return `&accessToken=${encodeURIComponent(accessToken)}`;
}

export function getHeaders() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}
export function getParams(params) {
    const query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return query;
}