const validateName = (name, key) => {
    if (key == 1) {
        return name.match(/^[a-zA-Z ]+$/) ? true : `Name should contain only alphabets`
    }
}

const validateEmail = (email, key) => {
    if (key == 1) {
        return email.match(/^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/) ? true : `Enter valid email(Eg:gopiya@gmail.com)`
    }
}

const validateUsername = (username, key) => {
    if (key == 1) {
        return username.match(/^[a-zA-Z0-9]{3,18}$/) ? true : `Username must has minimum 3 and maximum 18 characters`
    }
}


const validateMobile = (mobile, key) => {
    if (key == 1) {
        return mobile.match(/^(\+91-)[6-9]\d{9}$/) ? true : `Mobile number should contain 10 digit number along with +91(Eg:+91-9876543212)`
    }
}


const validateDate = (date, key) => {
    if (key == 1) {
        return date.match(/(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/) ? true : `The date should be in this format DD/MM/YYYY`
    }
}

const validatePassword = (password, key) => {
    if (key == 1) {
        return password.match(/^[a-zA-Z0-9]{8,12}$/) ? true : `Password length should be minimum 8 and maximum 12`
    }
}

const validateConfirm = (password, confirm) => {
    return (password == confirm) ? true : `Both password and confirm password must match`
}

module.exports = {
    validateName,
    validateEmail,
    validateUsername,
    validateMobile,
    validateDate,
    validatePassword,
    validateConfirm
}