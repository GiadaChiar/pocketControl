
import Input from "./input";
import Button from "./button";
import DataInput from "./datainput";
import { useState } from "react";
import PopUp from "../components/popUp";
//import { validationInput } from "../function/Validation";
import { NewGoal } from "../services/goalService";
import "../style/popUp.scss";




export default function CollapseGoal() {
    const [getDate, setDate] = useState("");
    const [getTarget, setTarget] = useState("");
    const [getCurrent, setCurrent] = useState("");
    const [getDescription, setDescription] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleGoal = async () => {
        if (!getDate || !getTarget || !getCurrent) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "Compila tutti i capi obbligatotri",
            });
            return;
        }

        if (Number(getTarget) < Number(getCurrent)) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "l'obbiettivo non può esssere inferiore alla somma di partenza",
            });
            return
        }

        console.log("taget", getTarget);
        console.log("current", getCurrent);
        console.log("description", getDescription);
        console.log("date", getDate);



        try {
            const user = await NewGoal(
                getDate,
                Number(getTarget),
                Number(getCurrent) || 0,
                getDescription || null

            );

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
                    message: "Obbiettivo inserito"
                });
                return;
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
            <button
                className="btn btn-primary"
                id="GoalButton"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#GoalCollapse"
                aria-expanded="false"
                aria-controls="filterCollapse"
            >
                Nuovo Obbiettivo
            </button>
            <div className="collapse" id="GoalCollapse">
                <form id="filter"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleGoal();
                    }}>
                    <div className="card card-body" id="filterSection">




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
                                <DataInput
                                    label="data"
                                    id="date_goal"
                                    name="date_goal"
                                    value={getDate}
                                    onChange={(e) => setDate(e.target.value)}

                                />
                            </div>

                            <div>
                                <Input
                                    id="target_amount"
                                    type="number"
                                    placeholder="1500,75"
                                    id_span="target_amount_span"
                                    text_span="Obbiettivo"
                                    onChange={(e) =>
                                        setTarget(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    id="current_amount"
                                    type="number"
                                    placeholder="500"
                                    id_span="current_amount_span"
                                    text_span="Soldi di partenza"
                                    onChange={(e) =>
                                        setCurrent(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    id="description_goal"
                                    type="text"
                                    placeholder="pizzata di classe"
                                    id_span="description_goal_span"
                                    text_span="Descrizione*"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                id="btn_Goal"
                                className="buttonSend"
                                label="Inserisci"
                                type="button"
                                onClick={handleGoal}
                            />
                        </div>
                    </div>
                </form>
            </div>

        </>
    )

}