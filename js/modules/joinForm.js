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
    const datasFromLocalstorage = localStorage.getItem(KEY_USER)
    const convertUsers = JSON.parse(datasFromLocalstorage) || []
    const users = convertUsers
    if (datasFromLocalstorage != null) {
        users.forEach(elt => {
            if (elt.name === user.name) {
                alert("Compte déjà créé")
            } else {
                users.push(user)
            } 
        })        
    } else {
        users.push(user)
        alert("Compte créé avec succès")
    }
    
    localStorage.setItem(KEY_USER, JSON.stringify(users))
}

export{validateName,validateEmail,validatePassword,saveUser}