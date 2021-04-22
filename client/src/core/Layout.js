import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({children, match, history}) =>{

    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    };


    const nav = () => (
        <ul className= "nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className= "text-light nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li>
            {isAuth() ? 
                null : <li className="nav-item">
                <Link to="/signup" className="text-light nav-link" style={isActive('/signup')}>
                    Signup
                </Link>
            </li>
            }
            {isAuth() ?
                null: 
                <li className="nav-item">
                <Link to="/signin" className="text-light nav-link" style={isActive('/signin')}>
                    Signin
                </Link>
            </li>
            }
            {isAuth() ?
                <li className="nav-item">
                <Link to={isAuth().username} className="text-light nav-link" style={isActive('/signin')}>
                    My Profile
                </Link>
            </li>
            : null
            }

            {isAuth() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}

        </ul>
    );

    return(
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    )
}

export default withRouter(Layout);