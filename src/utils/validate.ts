export class Validate {
    // Validate email using the regex pattern
    static email(mail: string) {
        const emailValidation = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        return emailValidation.test(mail);
    }

    // Validate password: 8-15 characters, allows special characters but no accents
    static password(val: string) {
        const passwordValidation = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,15}$/;
        return passwordValidation.test(val);
    }

    // Validate full name: at least 5 characters, only letters, allows accents, no numbers or special characters
    static fullName(name: string) {
        const fullNameValidation = /^[a-zA-ZÀ-ỹ\s]{5,}$/; // At least 5 letters, allows letters and spaces only
        return fullNameValidation.test(name);
    }

    static EventValidation = (data: any) => {
        const mess: string[] = [];
        Object.keys(data).forEach(key => {
            if (key !== 'description' && key !== 'users') {
                !data[key] && mess.push(`${key} is required!!!`);
            }
        });

        return mess
    }
}
