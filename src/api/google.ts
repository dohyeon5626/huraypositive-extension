import axios from 'axios';

import { getGoogleOauthToken, refreshGoogleOauthToken } from '../message/message-sender';
import { getTodayDateString } from '../util/date';
import { Event, EventItem } from '../type/google-response';

let googleToken: string;

const googleAxios = async () => {
    googleToken = await getGoogleOauthToken()
    
    const client = axios.create({
        baseURL: 'https://www.googleapis.com',
        headers: {
            'Authorization': `Bearer ${googleToken}`
        }
    });

    client.interceptors.response.use(
        response => response,
        async (error) => {
            if(error.response.status == 401) {
                await refreshGoogleOauthToken();
                googleToken = await getGoogleOauthToken();
                error.config.headers.Authorization = `Bearer ${googleToken}`;
                return axios(error.config);
            }
            return Promise.reject(error);
        }
    );

    return client;
}

export const getTodayCompanySchedule = () => {
    return new Promise<EventItem[]>(async (resolve) => {
        const dateString = getTodayDateString();

        (await googleAxios()).get<Event>(`/calendar/v3/calendars/huray@huray.net/events`,{
            params: {
                singleEvents: true,
                timeMin: `${dateString}T00:00:00+09:00`,
                timeMax: `${dateString}T23:59:59+09:00`
            }
        }).then(response => resolve(response.data.items));
    });
}