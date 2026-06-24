
import Button from "./button";
import DataInput from "./datainput";
import { useState} from "react";
import PopUp from "../components/popUp";
import DropDown from "../components/dropdown";
//import { validationInput } from "../function/Validation";
import { FiltersTable } from "../services/filterServices";
import "../style/popUp.scss";


export default function ShowTable() {
    const [getType, setType] = useState("");
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });



    const handleTable = async () => {
        if ( !getType) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "Compila tutti i capi obbligatotri",
            });
            return;
        }
        

        try {
            const user = await FiltersTable(
                getType,
                getStartDate || null,
                getEndDate || null

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


                        <DropDown
                            label="Tipologia"
                            id="typeFilter"
                            options={[
                                { label: "Transazioni", value: "transactions" },
                                { label: "Obbiettivi", value: "goals" },
                                { label: "Buget", value: "budgets" }
                                
                            ]}
                            onSelect={(value) => setType(value)}
                        />

                        

                        <DataInput
                            label="data iniziale*"
                            id="date_start"
                            name="date_start"
                            value={getStartDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            
                        />

                        <DataInput
                            label="data finale*"
                            id="date_end "
                            name="date_end"
                            value={getEndDate}
                            onChange={(e) => setEndDate(e.target.value)}

                        />

                        

                        <div>
                            <Button
                                id="general_filter"
                                className="buttonSend"
                                label="Cerca"
                                type="button"
                                onClick={handleTable}
                            />
                        </div>

                    </>
                    )

}