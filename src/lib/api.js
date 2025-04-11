import axios from 'axios';

export function getMaithAPI() {
    const maithURL = process.env.NEXT_PUBLIC_MAITH_API_URL || 'https://mathai.kro.kr';
    const maithAPI = axios.create({
        baseURL: `${maithURL}/api`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return maithAPI;
}

export function getAuthenticatedMaithAPI() {
    const maithAPI = getMaithAPI();
    const token = localStorage.getItem('accessToken');

    if (!token) throw new Error('Not Authenticated');
    return axios.create({
        ...maithAPI.defaults,
        headers: {
            ...maithAPI.defaults.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}
