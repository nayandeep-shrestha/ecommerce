const commonFunc ={
    //function to make first character of a string capital
    capFirst : (str) => {
        return str.charAt(0).toUpperCase()+str.slice(1)
    }
    // setCookie: (name, value, expiry) => {
    //     const date = new Date();
    //     date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000))
    //     document.cookie = name+"="+value+";"+"expires="+date.toUTCString()+"; path=/";
    // },
    // getCookie: (name) =>{
    //   let key = name+"=";
    //   let cookie_data = decodeURIComponent(document.cookie);
    //   let parts = cookie_data.split(";");
    //   for(let i=0; i< parts.length; i++){
    //     let cookie = parts[i];
    //     while(cookie.charAt(0) === ' '){
    //         cookie = cookie.substring[1];
    //     }
    //     if(cookie.indexOf(key) == 0){
    //         return cookie.substring(key.length, cookie.length)
    //     }
    //   }  
    //   return null;
    // }
}
export default commonFunc;