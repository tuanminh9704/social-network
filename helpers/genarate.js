module.exports.randomString = (length) => {
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result ="";
    for(let i = 0; i < character.length; i++) {
        result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
}