import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, value) => {
    if(window !== 'undefined'){
        return cookie.get(key);
    }
};

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key);
    }
};

export const authenticate = (response, next) => {
    console.log('Authenticate helper on signin response', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
};

export const getUser = () => {
    var userObject =JSON.parse(localStorage.getItem('user'));
    return userObject;
}

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response, next) => {
    console.log('Update user in localstorage helpers', response);
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};

