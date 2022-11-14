import Head from "next/head";
import Timer from "../components/Timer";

const Home = () => {

  const pageTitle = "The Pomodoro App";

  return <div className="home">

    <Head>{ pageTitle }</Head>

    <Timer />

  </div>;
};

export default Home;
