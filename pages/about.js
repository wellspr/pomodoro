import Head from "next/head";

const About = () => {

    const pageTitle = "About the Pomodoro App";

    return <div>
        <Head>{ pageTitle }</Head>

        <h2>{ pageTitle }</h2>
    </div>;
};

export default About;