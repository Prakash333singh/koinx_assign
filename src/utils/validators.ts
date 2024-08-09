
import moment from 'moment';

export const isValidDate = (dateString: string): string | null => {
    const formats = ["YYYY-MM-DD HH:mm:ss", "DD-MM-YYYY HH:mm"];
    for (const format of formats) {
        if (moment(dateString, format, true).isValid()) {
            return format;
        }
    }
    return null;
};
