import {JSX} from 'react';
import s from './Navbar.module.scss';
import Link from "next/link";

const Navbar = (): JSX.Element => {
    return (
        <div className={s.navbarContainer}>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Categories</Link>
            <Link href={"#"}>Where We Are?</Link>
        </div>
    );
};

export default Navbar;