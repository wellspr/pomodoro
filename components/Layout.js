import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return <div className="wrapper">

        <Header />

        <main className="main">{ children }</main>

        <Footer />

    </div>;
};

export default Layout;
