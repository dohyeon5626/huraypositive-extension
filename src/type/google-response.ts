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