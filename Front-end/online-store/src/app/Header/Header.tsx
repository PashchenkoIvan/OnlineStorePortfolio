import Logo from '@/app/Header/Logo/Logo';
import Navbar from "@/app/Header/Navbar/Navbar";
import s from './Header.module.scss';

const Header = () => {
    return (
        <div className={s.headerContainer}>
            <Logo />
            <Navbar />
        </div>
    );
};

export default Header;