

import "../style/home.scss";
import "../style/form.scss";

import Form from "../components/form";
import TopHome from "../components/topHome";
import ButtonHome from "../components/buttonHome";




// home page 

function Home() {
    return (
        <>
            <div id="home_container">
                <div className="content">
                    <TopHome />
                    <ButtonHome />
                </div>
            </div>

        </>
    );
}


// structure of Home page
function HomePage() {
    return (
        <>
            <Home />
            <Form />
        </>
    );
}

export default HomePage;


