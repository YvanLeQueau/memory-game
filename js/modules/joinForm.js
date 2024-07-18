function validateName(elt) {
    const pattern = /^.{3,}$/
    return pattern.test(elt)
}

function validateEmail(elt) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return pattern.test(elt);
}

function validatePassword(elt) {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{6,}$/;
    return pattern.test(elt);
}

const KEY_USER = 'users'

function saveUser(user) {
    const users = getUsers()
    console.log(user)
    console.log(users)
    //if (users.include(user)) {
    //    alert("Compte déjà créé")
    //} else {
        users.push(user)
    //}
    localStorage.setItem(KEY_USER, JSON.stringify(users))
}

function getUsers() {
    const datasFromLocalstorage = localStorage.getItem(KEY_USER)
    const convertUsers = JSON.parse(datasFromLocalstorage) || []
    return convertUsers
}

export{validateName,validateEmail,validatePassword,saveUser}