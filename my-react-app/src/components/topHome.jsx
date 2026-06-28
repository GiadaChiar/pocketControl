

import teamImg from "../assets/team.jpeg";




// home page 

export default function TopHome() {
    return (
        <>
            
                <div className="bubbles">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                    <div className="center">
                        <div className="under">
                    <h1 >Financial Control</h1>
                    <div id= "textHome">
                            <p>Rendi facile e a portatata di mano la tua gestione finanziaria</p>
                        <p>Insieme a noi.</p>
                    </div>
                        </div>
                        <div className="circle-wrapper">
                            <div className="outer-circle">
                                <img src={teamImg} alt="profile" />

                                <div className="inner-circle"></div>
                            </div>
                        </div>
                    </div>
            
        </>
    );
}







