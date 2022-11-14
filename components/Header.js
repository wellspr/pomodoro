import Link from "next/link";

const Header = () => {

    return <header className="header">
        <div className="header__title">
            <h1 className="header__title__text">The Pomodoro App</h1>
        </div>
        <div className="header__menu">
            <ul className="header__menu__list">
                <li className="header__menu__list__item">
                    <Link href="/">Home</Link>
                </li>
                <li className="header__menu__list__item">
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </div>
    </header>;
};

export default Header;
