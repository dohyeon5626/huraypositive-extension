export interface Event {
    items: EventItem[]
}

export interface EventItem {
    start: EventDateTime,
    end: EventDateTime,
    location: string
}

export interface EventDateTime {
    dateTime: string
}

export interface Calendar {
    items: CalendarItem[]
}

export interface CalendarItem {
    id: string,
    summary: string
}