
export class Validate {
    static email(mail: string) {
        const emailValidation = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        if (emailValidation) {
            return true;
        }
        return false;
    }
    static Password = (val: string) => {
        return val.length >= 6
    }
}