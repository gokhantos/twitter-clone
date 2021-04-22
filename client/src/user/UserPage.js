import React from 'react';
import Layout from '../core/Layout';
import '../style/user.css';
import Posts from './Posts';
import ProfilePicture from './ProfilePicture';
import Follow from './Follow';
const UserPage = (props) => {
    return(
        <Layout>
            <div key={props.match.params.user}>
            <ProfilePicture name={props.match.params.user}/>
            <Follow name={props.match.params.user}/>
            <Posts name={props.match.params.user}/>
            </div>
        </Layout>
    );
};

export default UserPage;