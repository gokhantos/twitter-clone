import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { isAuth, getCookie } from '../auth/helpers';

const Posts = (props) => {
    const [values, setValues] = useState({
        username: props.name,
        auth_token: getCookie('token'),
        post: '',
        posts: [],
        posts_changed: false
    });

    const {username, post, posts, posts_changed, auth_token} = values;

    useEffect(() => {
        getPostsData();
    },[posts_changed])


    function getPostsData(){
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/user`,
            data: {username}
        }).then((response) => {
            setValues({...values, posts: response.data.posts, posts_changed: false});
        }).catch((error) => {
            console.log(error);
        });
    }

    const onChangeHandler = (event) =>{
        setValues({...values, post: event.target.value});
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/post`,
            data: {post, username, auth_token}
        }).then((response) => {
            setValues({...values, post: "", posts_changed: true});
        }).catch(error => {
            console.log(error);
        })
    }

    if(username === isAuth().username){
        return(
            <div>
                <form>
                    {posts.map((element, index) => <li key={index}>{element.data}</li>)}
                    <input onChange={onChangeHandler} value={post}/>
                    <button onClick={onClickHandler}> Post </button>
                </form>
            </div>
        )
    }else{
        return(
            <div>
                <form>
                    {posts.map((element, index) => <li key={index}>{element.data}</li>)}
                </form>
            </div>
        )
    }
}

export default Posts;