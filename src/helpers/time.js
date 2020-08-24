import moment from 'moment'
export const diff_minutes = (dt2, dt1) => {
    dt2 = new Date(dt2)
    dt1 = new Date(dt1)
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    return Math.abs(diff) < 1 ? 0 : Math.abs(Math.round(diff));
}

export const calculateCurrentTimeInEst = () => {
    var localZone = moment.tz.guess();
    let currTime = new Date();
    var zoneOffset = moment.tz(new Date(), localZone).utcOffset();
    var estOffset = moment.tz(new Date(), 'America/New_York').utcOffset();

    currTime = currTime.setHours((currTime.getHours() - (zoneOffset / 60) + (estOffset / 60)), (currTime.getMinutes() - (zoneOffset % 60) + (estOffset % 60)), 0)
    return currTime
}

export const changeEndDate = (date, time) => {
    time = time ? new Date(time) : new Date()
    date = date ? new Date(date) : new Date()
    time.setDate(date.getDate());
    time.setMonth(date.getMonth());
    time.setYear(date.getFullYear());

    return time;
}

export const convertToESTTimeZone = (date) => {
    var localZone = moment.tz.guess();
    var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;
    var estOffset = (moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) + 60) * 60000;

    return moment(date.getTime() - zoneOffset + estOffset).toISOString()
}
