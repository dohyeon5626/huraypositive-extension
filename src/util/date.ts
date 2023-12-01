export const getTodayDateString = () => {
    return new Date((new Date()).getTime() + (1000 * 60 * 60 * 9)).toISOString().split('T')[0];
}