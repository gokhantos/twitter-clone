import React, {useState, useEffect} from 'react';
import { getCookie, isAuth } from '../auth/helpers';
import axios from 'axios';

const ProfilePicture = (props) => {
    const [values, setValues] = useState({
        username: props.name,
        profile_picture: '',
        selectedFile: null,
        auth_token: getCookie('token'),
        pp_changed: false
    })

    const { username, profile_picture, selectedFile, auth_token, pp_changed} = values;

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

        
    useEffect(() => {
        getppData();
    },[pp_changed])

    function getppData() {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/user`,
            data: {username}
        })
        .then((response) => {
            if(!response.data.profile_picture.imageName){
                setValues({...values, profile_picture: `${process.env.REACT_APP_CLIENT}/img/default_image.jpeg`, pp_changed: false})
            }else{
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(response.data.profile_picture.imageData.data);
                setValues({...values, profile_picture: base64Flag+imageStr, pp_changed: false});
            }
        })
        .catch(error => {
            console.log('Error', error);
        });
    }

    const onClickHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', selectedFile);
        formData.append('username', username);
        formData.append('token', auth_token);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/image`,
            data: formData
        }).then(response => {
            setValues({...values, pp_changed: true});
        }).catch(err => {
            console.log(err);
        })
    }

    const onChangeHandler = event => {
        setValues({...values, selectedFile: event.target.files[0]})
    }
    const uploadPicture = () => (
        <div>
            <input type="file" name="profilePic" onChange= {onChangeHandler}/>
            <button type="button" name="profilePic" onClick={onClickHandler}>Upload</button> 
        </div>
    )

    if(username === isAuth().username){
        return(
            <div>
                <img className="profilePic" alt="profile_picture"  src={profile_picture} />
                {uploadPicture()}
            </div>
        )
    }else{
        return(
            <div>
                <img className="profilePic" alt="profile_picture"  src={profile_picture} />
            </div>
        )
    }

}

export default ProfilePicture;