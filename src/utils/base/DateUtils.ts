import { parse, isValid, format as formatDate } from 'date-fns';

/**
 * Custom parse behavior on top of date-fns parse function.
 */
export function parseDate (date: string | Date, format: string): Date | null | undefined {
    if (typeof date !== 'string') {
      return isValid(date) ? date : null;
    }

    const parsed = parse(date, format, new Date());

    // if date is not valid or the formatted output after parsing does not match
    // the string value passed in (avoids overflows)
    if (!isValid(parsed) || formatDate(parsed, format) !== date) {
      return null;
    }

    return parsed;
}

export class DateHelper {

    public static parse(str: string, pattern: string): DateHelper | null {
        if (!str) {
            return null;
        }
        const tokens = str.split(/[/|:|\s]/).map((tk) => Number(tk));

        // Check if any tokens is null or not an integer
        if (tokens.some((tk) => isNaN(tk) || Math.floor(tk) !== tk)) {
            return null;
        }

        const patternTokens = pattern.split(/[/|:|\s]/);

        let err = false;
        const setField = (fn: (v: number) => void, val: number, max: number, min = 0) => {
            if (err) {
                return;
            } else if (val < min || val > max) {
                err = true;
                return;
            }
            fn(val);
        };

        let dateFields = 0;

        for (const tk of patternTokens) {
            if (tk === "dd" || tk === "MM" || tk === "yyyy" || tk === "HH" || tk === "mm" || tk === "ss") {
                dateFields++;
            }
        }

        const dt = new DateHelper(new Date(0)).startOfDay().toDate();
        tokens.forEach((tk, i) => {
            if (i >= patternTokens.length) {
                return;
            } else if (patternTokens[i] === "dd") {
                dateFields--;
                setField((v) => dt.setDate(v), tk, 31, 1);
            } else if (patternTokens[i] === "MM") {
                dateFields--;
                setField((v) => dt.setMonth(v), tk - 1, 11);
            } else if (patternTokens[i] === "yyyy") {
                if(tk < 1000){
                    err = true;
                }
                dateFields--;
                setField((v) => dt.setFullYear(v), tk, 9999, 1);
            } else if (patternTokens[i] === "HH") {
                dateFields--;
                setField((v) => dt.setHours(v), tk, 23);
            } else if (patternTokens[i] === "mm") {
                dateFields--;
                setField((v) => dt.setMinutes(v), tk, 59);
            } else if (patternTokens[i] === "ss") {
                dateFields--;
                setField((v) => dt.setSeconds(v), tk, 59);
            }
        });

        if (err || dateFields != 0) {
            return null;
        }
        return new DateHelper(dt);
    }

    public static workingDaysBetweenDates(startDate: Date, endDate: Date, holidays: Date[]): number {
        // Validate input
        if (endDate < startDate) {
            return 0;
        }

        let z = 0; // number of days to substract at the very end
        for (let i = 0; i < holidays.length; i++) {
            const cand = holidays[i];
            if (cand) {
                const candDay = cand.getDay();
                if (cand >= startDate && cand <= endDate && candDay !== 0 && candDay !== 6) {
                    // we'll only substract the date if it is between the start or end dates AND it isn't already a saturday or sunday
                    z++;
                }
            }
        }

        // Calculate days between dates
        const millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0, 0, 0, 1);  // Start just after midnight
        endDate.setHours(23, 59, 59, 999);  // End just before midnight

        const diff = endDate.getTime() - startDate.getTime();  // Milliseconds between datetime objects
        let days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        const weeks = Math.floor(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        const startDay = startDate.getDay();
        const endDay = endDate.getDay();

        // Remove weekend not previously removed.
        if (startDay - endDay > 1) {
            days = days - 2;
        }

        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay === 0 && endDay !== 6) {
            days = days - 1;
        }

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay === 6 && startDay !== 0) {
            days = days - 1;
        }

        // substract the holiday dates from the original calculation and return to the DOM
        return days - z;
    }

    private dt: Date;

    constructor(dt: Date | DateHelper = new Date()) {
        let d: Date;
        if (dt instanceof DateHelper) {
            d = dt.dt;
        } else {
            d = dt;
        }
        this.dt = new Date(d);
    }

    public toDate(): Date {
        return new Date(this.dt);
    }

    public isSame(other: DateHelper): boolean {
        return this.dt.getTime() === other.dt.getTime();
    }

    public startOfDay(): DateHelper {
        const d = new Date(this.dt);
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
        return new DateHelper(d);
    }

    // mimimal formatting capabilities using JAVA like pattern
    public format(pattern: string): string {
        const str = (n: number, len = 2) => {
            let s = n.toString(10);
            while (s.length < len) {
                s = "0" + s;
            }
            return s;
        };

        // dd/MM/yyyy HH:mi:ss
        const day = this.dt.getDate();
        const month = this.dt.getMonth() + 1;
        const year = this.dt.getFullYear();
        const hours = this.dt.getHours();

        let ret = pattern;
        ret = ret.replace("dd", str(day))
            .replace("MM", str(month))
            .replace("yyyy", str(year, 4))
            .replace("HH", str(this.dt.getHours()))
            .replace("mm", str(this.dt.getMinutes()))
            .replace("ss", str(this.dt.getSeconds()));

        if (ret.indexOf("hh") > -1) {
            const h = hours % 12;
            ret.replace("hh", str(h === 0 ? 12 : h));
            ret += hours <= 11 ? " AM" : " PM";
        }

        return ret;
    }

    public toString(): string {
        return `[DateHelper ${this.dt}]`;
    }

    public formattedDate(): string {
        if(!this.dt){
            return "";
        }
        return new DateHelper(this.dt).format("dd/MM/yyyy");
    }
    public formattedDateHour(): string {
        if(!this.dt){
            return "";
        }
        return new DateHelper(this.dt).format("dd/MM/yyyy HH:mm");
    }
    public formattedHour(): string {
        if(!this.dt){
            return "";
        }
        return new DateHelper(this.dt).format("HH:mm");
    }
}

export function formattedDate(dt: Date | null): string {
    return dt ? new DateHelper(dt).formattedDate() : "";
}
export function formattedDateHour(dt: Date | null): string {
    return dt ? new DateHelper(dt).formattedDateHour() : "";
}
export function formattedHour(dt: Date | null): string {
    return dt ? new DateHelper(dt).formattedHour() : "";
}

