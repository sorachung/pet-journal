export const convertToTimestamp = (date, time) => {
    const isoDate = `${date}T${time}`;
    return new Date(isoDate).getTime();
};

export const seeIfPast = (date, time) => {
    const timestamp = convertToTimestamp(date, time);
    if (timestamp - Date.now() < 0) {
        return true
    } else {
        return false
    }
}