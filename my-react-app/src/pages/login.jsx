import Title from "../components/title";
import Input from "../components/input";
import PopUp from "../components/popUp";
import Menu from "../components/menu";
import "../style/user.scss";
import "../style/popUp.scss";
import "../style/menu.scss";
import "../style/default.scss";
import { useState } from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";
import handleValidation from "../function/ValidationLogin";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";

//login function
export function LogIn() {

    const navigate = useNavigate();

    //get input
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleLogIn = async () => {
        const credentials = handleValidation(
            getEmail,
            getPassword,
            setPopup
        );

        if (!credentials) return;

        try {
            const user = await loginService(
                credentials.email,
                credentials.password
            );

            //if (user.type === "login") {
            console.log("arrivato richiesta", user.type)
            if (user.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: user.error,
                });
            }
            if (user.success === true) {
                setPopup({
                    visible: true,
                    alert: "Registrazione eseguita",
                    message: "Bentornato"
                });
                if (user.data) {
                    localStorage.setItem("token", user.data);
                    console.log("TOKEN SALVATO:", user.data);
                    navigate("/dashboard")

                }
                return;
                //}
            }
        } catch {
            setPopup({
                visible: true,
                alert: "Problemi Tecnici",
                message: "La richiesta non è andata a buon fine. Riprovi per favore."
            });
            return;
        }
    }
    return (
        <>
            <Menu />
            <div className="user-page">

                <div className="over">
                    <Title
                        classname="title"
                        id="title_login"
                        text="Login"
                    />

                    <h2 className="title2">Bentornato!</h2>

                    {popup.visible && (
                        <PopUp
                            alert={popup.alert}
                            message={popup.message}
                            onClose={() =>
                                setPopup({
                                    visible: false,
                                    alert: "",
                                    message: ""
                                })
                            }
                        />
                    )}

                    <div id="input_login" className="inLine">
                        <div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="miaemail@gmail.com"
                                id_span="email_span"
                                text_span="Email"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                id_span="span_password"
                                text_span="password"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            id="btn_logIn"
                            className="buttonSend"
                            label="ACCEDI"
                            type="submit"
                            onClick={handleLogIn}
                        />
                    </div>

                    <div>
                        <Link className="navbar-brand" to="/register">
                            {"Sei nuovo? Registrati!"}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn;