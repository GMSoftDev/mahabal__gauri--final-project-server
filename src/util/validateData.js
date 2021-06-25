const validateKeys = (keys, contact) => {
    let errors = [];
    let contactKeys = Object.keys(contact);

    keys.forEach(key => {
        if (!contactKeys.find(val => val === key)) { errors.push(`Required field: '${key}' not found`) }
    });

    return errors;
}

const validateContactData = (contact) => {

    let errors = [];


    if (contact.name == null || contact.name == undefined || contact.name == "") {
        errors.push(`Invalid name`);
    }
    if (!validEmail(contact.email)) {
        errors.push(`Invalid email`);
    }
    if (!validPhone(contact.phoneNumber)) {
        errors.push(`Invalid phoneNumber`);
    }

    if (contact.content == null || contact.content == undefined || contact.content == "") {
        errors.push(`Invalid content`);
    }

    return errors;
}

const validateUserData = (user) => {
    let errors = [];

    if (user.name == null || user.name == undefined || user.name == "") {
        errors.push(`Invalid name`);
    }

    if (!validEmail(user.email)) {
        errors.push(`Invalid email`);
    }

    return errors;
}

const validEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validPhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone).toLowerCase());
}

export { validateKeys, validateContactData, validateUserData };