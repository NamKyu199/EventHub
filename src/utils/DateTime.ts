import { appInfo } from "~constants/appInfos";
import { numberToString } from "./numberToString";

export class DateTime {
    static GetTime = (num: Date) => {
        const date = new Date(num);
        return `${numberToString(date.getHours())} : ${numberToString(date.getMinutes())}`;
    }
    static GetDate = (num: Date) => {
        const date = new Date(num);
        return `${numberToString(date.getDate())} ${appInfo.monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    }
    static GetDayString = (num: Date | Number) => {
        const date = new Date(Number(num));

        return `${appInfo.dayNames[date.getDay()]}, ${appInfo.monthNames[date.getMonth()]} ${numberToString(date.getFullYear())}`;
    };

    static GetStartAndEnd = (start: number, end: number) => {
        if (!start || !end || isNaN(start) || isNaN(end)) return "Invalid time";

        const formatTime = (date: Date) => {
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const amPm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Chuyển đổi 0 thành 12 AM, 13-23 thành 1-11 PM

            return `${hours}:${minutes} ${amPm}`;
        };

        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        return `${formatTime(dateStart)} - ${formatTime(dateEnd)}`;
    };
};
