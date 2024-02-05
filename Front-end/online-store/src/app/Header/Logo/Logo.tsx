import {JSX} from 'react';
import s from './Logo.module.scss';

const Logo = (): JSX.Element => {
    return (
        <div className={s.logoContainer}>
            <h1>Online Shop</h1>
        </div>
    );
};

export default Logo;