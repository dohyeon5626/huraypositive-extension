import axios from 'axios';

import { getGoogleOauthToken, refreshGoogleOauthToken } from '../message/message-sender';
import { Calendar, CalendarItem, Event, EventItem } from '../type/google-response';
import { getTodayDateString } from '../util/date';

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

export const addMissingMeetingRoomCalendar = (addedFunc: () => void) => {
    return new Promise<string[]>(async (resolve) => {
        const calendarIdList = (await (await googleAxios()).get<Calendar>(`/calendar/v3/users/me/calendarList`))
            .data.items.filter(item => item.summary.startsWith("휴레이-7층-")).map(item => item.id);

        const allCalendarIdList = [
            "c_18812llvmtte8i84ljt36n9bq5sbc@resource.calendar.google.com",
            "c_188642t7hqp0kj3jj319lonlknsga@resource.calendar.google.com",
            "c_1887lssfankfoj5kkva1mh72ieb4k@resource.calendar.google.com",
            "c_188d80is9tmnmjr5h9ieec8hk0ujo@resource.calendar.google.com",
            "c_188bp0r790l16ht2hshhjij9asseg@resource.calendar.google.com",
            "c_1887tge6sg77khamjrmmarslfullu@resource.calendar.google.com",
            "c_1888ldlc8ki96jalma9hk37qml7r0@resource.calendar.google.com",
            "c_1881ikkr428e2ja6i7bv31lkdffvk@resource.calendar.google.com",
            "c_1880l1qjniqegjngn3md7th6h44fg@resource.calendar.google.com"
        ];

        const notAddedCalendarIdList = allCalendarIdList.filter(calendarId => !calendarIdList.includes(calendarId));
        notAddedCalendarIdList.forEach(async (calendarId) => {
                (await googleAxios()).post<void>(`/calendar/v3/users/me/calendarList`, {
                    id: calendarId,
                    selected: false
                });
            });

        if (notAddedCalendarIdList.length > 0) addedFunc();
    });
}