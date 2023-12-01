import axios from 'axios';

import { getGoogleOauthToken } from '../message/message-sender';
import { getTodayDateString } from '../util/date';
import { Event, EventItem } from '../type/google-response';

const googleAxios = async () => axios.create({
    baseURL: 'https://www.googleapis.com',
    headers: {
        'Authorization': `Bearer ${await getGoogleOauthToken()}`
    }
});

export const getTodayCompanySchedule = () => {
    return new Promise<EventItem[]>(async (resolve, reject) => {
        const dateString = getTodayDateString();

        (await googleAxios()).get<Event>(`/calendar/v3/calendars/huray@huray.net/events`,{
            params: {
                singleEvents: true,
                timeMin: `${dateString}T00:00:00+09:00`,
                timeMax: `${dateString}T23:59:59+09:00`
            }
        }).then(response => resolve(response.data.items))
        .catch(reject);
    });
}