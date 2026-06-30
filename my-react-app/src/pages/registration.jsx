
import Title from "../components/title";
import Input from "../components/input";
import Button from "../components/button";
import { PopUp } from "../components/popUp";
import Menu from "../components/menu";
import "../style/user.scss";
import "../style/popUp.scss";
import "../style/menu.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registartionService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import CheckRegistration from "../function/ValutationRegistration";

//registration new user
export default function Registration() {
    const navigate = useNavigate();
    //get input
    const [getEmail, setEmail] = useState("");
    const [getName, setName] = useState("");
    const [getSurname, setSurname] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getCopyPassword, setCopyPassword] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleRegistration = async () => {

        const credentials = CheckRegistration(
            getEmail.trim().toLowerCase(),
            getName.trim(),
            getSurname.trim(),
            getPassword.trim(),
            getCopyPassword.trim(),
            setPopup
        )

        if (!credentials) return;
        console.log(credentials);

        try {
            const user = await registartionService(
                credentials.email,
                credentials.name,
                credentials.surname,
                credentials.password,
            )
            console.log("richiesta che è tornata", user);
            
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
                        message: "Benvenuto"
                    });
                    if (user.data) {
                        localStorage.setItem("token", user.data);

                        setPopup({
                            visible: true,
                            alert: "Registrazione effettuata",
                            message: "Procedere con il login"
                        });

                        setTimeout(() => {
                            navigate("/logIn");
                        }, 1200); // 1.2 second
                    }
                    
                    return;
                }

        } catch {
            setPopup({
                visible: true,
                alert: "Problemi tecnici",
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
                        id="title_registration"
                        text="ISCRIVITI"
                    />

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

                    <div className="inLine">
                        <div>
                            <Input
                                id="email_reg"
                                type="email"
                                placeholder="miaemail@gmail.com"
                                id_span="email_span_reg"
                                text_span="Email"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div>

                            <Input
                                id="name"
                                type="text"
                                placeholder="Mario"
                                id_span="name_span"
                                text_span="Nome"
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <div>

                            <Input
                                id="surname"
                                type="text"
                                placeholder="Rossi"
                                id_span="surname_span"
                                text_span="Cognome"
                                onChange={(e) =>
                                    setSurname(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Input
                                id="password_reg"
                                type="password"
                                placeholder="password"
                                id_span="span_password_reg"
                                text_span="password"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Input
                                id="password_copy"
                                type="password"
                                placeholder="password_copy"
                                id_span="span_password_copy"
                                text_span="Ripeti password"
                                onChange={(e) =>
                                    setCopyPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            id="btn_registration"
                            className="buttonSend"
                            label="REGISTRATI"
                            type="submit"
                            onClick={handleRegistration}
                        />
                    </div>

                    <div>
                        <Link className="navbar-brand" to="/login">
                            {"Sei già registrato? Accedi!"}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}


