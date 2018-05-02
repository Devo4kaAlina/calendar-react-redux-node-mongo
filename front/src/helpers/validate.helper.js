const EMAIL_REGEX = /^[0-9a-zA-Z.+!#%$'*+/=?_`{|}~-]+@([0-9a-z_.+-]+\.)+[0-9a-z_-]{2,6}$/;

function emailValidate(email) {
    if (!email) return 'Required fields are missing';
    if (email.length < 4) return 'Email must be at least 10 characters long';
    if (email.length > 100) return 'Email cannot be longer than 100 characters';

    if (!email.match(EMAIL_REGEX)) {
        return 'Email must be in format user@example.com';
    }

    return false;
}

function passwordValidate(password) {
    if (!password) return 'Required fields are missing';
    if (password.length < 4) return 'Password must be at least 4 characters long';
    if (password.length > 20) return 'Password cannot be longer than 20 characters';

    return false;
}

function confirmPasswordValidate(confirmPass, password) {
    if (!password || !confirmPass) return 'Required fields are missing';
    if (password !== confirmPass) return 'Password and confirmation password do not match';

    return false;
}
function firstNameValidate(firstName) {
    if (!firstName) return 'Required fields are missing';
    if (firstName.length < 2) return 'Name must be at least 2 characters long';
    if (firstName.length > 50) return 'Name cannot be longer than 50 characters';

    return false;
}

function lastNameValidate(lastName) {
    if (!lastName) return 'Required fields are missing';
    if (lastName.length < 2) return 'Surname must be at least 2 characters long';
    if (lastName.length > 50) return 'Surname cannot be longer than 50 characters';

    return false;
}

function eventTitleValidate(eventTitle) {
    if (!eventTitle) return 'Required fields are missing';
    if (eventTitle.length < 2) return 'Event title must be at least 2 characters long';
    if (eventTitle.length > 150) return 'Event title cannot be longer than 150 characters';

    return false;
}

export default {
    emailValidate,
    passwordValidate,
    confirmPasswordValidate,
    firstNameValidate,
    lastNameValidate,
    eventTitleValidate
}