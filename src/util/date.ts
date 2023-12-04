export const getTodayDateString = () => {
    return new Date((new Date()).getTime() + (1000 * 60 * 60 * 9)).toISOString().split('T')[0];
}

export const getTimeNumber = (dateTime: string) => {
    return new Date(dateTime).getTime();
}

export const getNowTimeNumber = () => {
    return new Date().getTime();
}