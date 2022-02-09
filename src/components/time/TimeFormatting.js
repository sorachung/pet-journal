export const convertToTimestamp = (date, time) => {
    const isoDate = `${date}T${time}`;
    return new Date(isoDate).getTime();
};