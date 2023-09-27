function setConnectionCookie(token) {
    let date = new Date();
    let hourToExpire = 2;
    date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
    document.cookie = `connection.token = ${token} ; expires = ${date.toGMTString()}`;
}

async function getConnectionToken() {
    if(document.cookie === '')
        return false
    let cookies = document.cookie.split(';');
    return cookies.find((cookie) => cookie.startsWith('connection.token')).split('=')[1];    
}

export { setConnectionCookie, getConnectionToken }



// function setConnectionCookie(token) {
//   let date = new Date();
//   let hourToExpire = 2;
//   date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
//   document.cookie = `connection.token = ${token} ; expires = ${date.toGMTString()}`;
// }

// function readCookie() {
//   let cookies = document.cookie.split(';');
//   let foundToken = cookies.find((cookie) => cookie.startsWith('connection.token')).split('=')[1];
//   setCookie(foundToken);
//   return foundToken;
// }


// readCookie().then((cookie) => {
//   setCookie(cookie);
//   console.log(cookie);
// });