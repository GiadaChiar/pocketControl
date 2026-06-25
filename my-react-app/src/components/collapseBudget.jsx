
import Input from "./input";
import Button from "./button";
import DataInput from "./datainput";
import { useState } from "react";
import PopUp from "../components/popUp";
import { NewBudget } from "../services/budgetService";
import "../style/popUp.scss";




export default function CollapseBudget() {
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [getLimit, setLimit] = useState("");
    const [getDescription, setDescription] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleBudget = async () => {
        if (!getStartDate || !getEndDate || !getLimit) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "Compila tutti i capi obbligatotri",
            });
            return;
        }

        if (new Date (getEndDate) < new Date (getStartDate)) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "la data finale non può essere prima di quella iniziale",
            });
            return
        }

        console.log("taget", getEndDate);
        console.log("current", getStartDate);
        console.log("description", getDescription);
        console.log("date", getLimit);



        try {
            const user = await NewBudget(
                getStartDate,
                getEndDate,
                Number(getLimit),
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
                        message: "Budget inserito"
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
                id="BudgetButton"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#BudgetCollapse"
                aria-expanded="false"
                aria-controls="filterCollapse"
            >
                Nuovo Budget
            </button>
            <div className="collapse" id="BudgetCollapse">
                <form id="filter"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBudget();
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

                        <div className = "inLine">

                        <div>
                        <DataInput
                            label="data iniziale"
                            id="date_goal"
                            name="date_goal"
                            value={getStartDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            
                                />
                            </div>

                        <div>
                        <DataInput
                            label="data finale"
                            id="date_goal"
                            name="date_goal"
                            value={getEndDate}
                            onChange={(e) => setEndDate(e.target.value)}

                                />
                            </div>

                        <div>
                        <Input
                            id="limit_amount"
                            type="number"
                            placeholder="800"
                            id_span="limit_amount_span"
                            text_span="Budget"
                            onChange={(e) =>
                                setLimit(e.target.value)
                            }
                                />
                            </div>

                        <div>
                        <Input
                            id="description_budet"
                            type="text"
                            placeholder="budget vacanze"
                            id_span="description_budget_span"
                            text_span="Descrizione*"
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            />
                            </div>
                        </div> 

                        <div>
                            <Button
                                id="btn_Budget"
                                className="buttonSend"
                                label="Inserisci"
                                type="button"
                                onClick={handleBudget}
                            />
                        </div>
                    </div>
                </form>
            </div>

        </>
    )

}