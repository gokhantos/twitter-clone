import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { isAuth, getCookie } from '../auth/helpers';

const Follow = (props) => {
    const [values, setValues] = useState({
        username: isAuth().username,
        followed_user: props.name,
        is_followed: false,
        auth_token: getCookie('token'),
        buttonText: 'Follow'
    })

    const {username, followed_user, is_followed, auth_token, buttonText} = values;

    useEffect(() => {
        isFollowed();
    }, [is_followed])

    function isFollowed(){
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/isfollowed`,
            data: {username, followed_user}
        }).then(response => {
            console.log(response.data.message);
            setValues({...values, buttonText: response.data.message, is_followed: true});
        }).catch(error => {
            console.log(error);
        })
    }
    function followUser(){
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/follow`,
            data: {username, followed_user, auth_token}
        }).then(response => {
            setValues({...values, buttonText:response.data.message, is_followed: true});
        }).catch(error => {
            console.log(error);
        })
    }

    function unfollowUser(){
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/unfollow`,
            data: {username, followed_user, auth_token}
        }).then(response => {
            setValues({...values, buttonText: 'Follow', is_followed: false})
        }).catch(error => {
            console.log(error);
        })
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        if(is_followed == true){
            unfollowUser();
        }
        if(is_followed == false){
            followUser();
        }
    }

    if(username == followed_user || !isAuth()){
        return(
            <br/>
        )
    }else{
        return(
            <div>
                <button onClick={onClickHandler}>{buttonText}</button>
            </div>
        )
    }

}

export default Follow;