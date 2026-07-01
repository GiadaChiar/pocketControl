
import Button from "./button";
import DataInput from "./datainput";
import { useState } from "react";
import { PopUp, ConfirmModal } from "../components/popUp";
import DropDown from "../components/dropdown";
import { TableGoal, TableBudget, TableTransaction } from "./Tables";
import { FiltersTable } from "../services/filterServices";
import { DeleteFilterTable } from "../services/filterServices";
import { ChangeGoal } from "../services/goalService";
import "../style/popUp.scss";


export default function ShowTable() {
    const [getType, setType] = useState("");
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [getTransactionType, setTransactionType] = useState("");

    //change Goal
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [getGoalValue, setGoalValue] = useState("");

    const [tableType, setTableType] = useState("");
    const [tableData, setTableData] = useState([]);


    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleClean = () => {
        setTableData([]);
        setTableType("");
    };

    const handleOpenAddGoal = (goal) => {
        setSelectedGoal(goal);
        setGoalValue("");
    };

    const closeGoalPopup = () => {
        setSelectedGoal(null);
        setGoalValue("");
    };


    const handleConfirmGoal = async () => {
        try {

            console.log("STAMPAAAAAA ", getGoalValue);
            console.log("OLD  ", selectedGoal.target_amount)
            console.log("id", selectedGoal.id)

            if (getGoalValue === "") {
                console.log("nessun valore inserito", selectedGoal.id, getGoalValue)
                return;
            }

            if (selectedGoal.id && getGoalValue) {
                const res = await ChangeGoal(
                    Number(selectedGoal.id),
                    Number(getGoalValue)
                )
                if (res.success === false) {
                    setPopup({
                        visible: true,
                        alert: "Attenzione",
                        message: res.error,
                    });
                }
                if (res.success === true) {
                    console.log(res)
                    setPopup({
                        visible: true,
                        alert: "Obbiettrivo aggiornato",
                        message: `Sei al ${res.data.percentage}% del tuo obbiettivo `
                    });
                    setTableData((prev) =>
                        prev.map((g) =>
                            g.id === selectedGoal.id
                                ? { ...g, current_amount: Number(res.data.data) }
                                : g
                        )
                    );

                    closeGoalPopup();
                    
                    return;
                }
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


    const handleDelete = async (id) => {

            console.log("passo a delete ", id, getType)
            try {
                const res = await DeleteFilterTable(id, getType);

                console.log("RESPONSE DELETE:", res);

                if (res.success === true) {
                    setTableData((prev) => prev.filter((item) => item.id !== id));
                    setPopup({
                        visible: true,
                        alert: "Eseguito",
                        message: "Elemento eliminato correttamente",
                    });
                    return;
                }

                else {
                    setPopup({
                        visible: true,
                        alert: "Attenzione",
                        message: res.error,
                    });
                }
            } catch (error) {
                setPopup({
                    visible: true,
                    alert: "Problemi Tecnici",
                    message: " L'elemento non è stato eliminato correttamente. Riprovi per favore."
                });
                console.error(error)
                return;
            }
        }



        const handleTable = async () => {
            if (!getType) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "E' obbligatorio filtrare almeno per tipologia",
                });
                return;
            }

            if ((getStartDate && !getEndDate) || (!getStartDate && getEndDate)) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "Selezionare il range (data iniziale e finale)",
                });
                return;
            }

            if (new Date(getStartDate) > new Date(getEndDate)) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "La data iniziale non può essere maggiore di quella finale",
                });
                return;
            }



            console.log("type", getType);
            console.log("start", getStartDate);
            console.log("End", getEndDate);


            console.log("transation new ", getTransactionType)
            try {
                const user = await FiltersTable(
                    getType,
                    getStartDate || null,
                    getEndDate || null,
                    getTransactionType || null

                );

                if (user.success === false) {
                    setPopup({
                        visible: true,
                        alert: "Attenzione",
                        message: user.error,
                    });
                }
                if (user.success === true) {
                    setTableType(user.type);
                    setTableData(user.date);
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
                <div id="filter">


                    <div className="filter-container">
                        <DropDown
                            label="Tipologia"
                            id="typeFilter"
                            options={[
                                { label: "Transazioni", value: "transactions" },
                                { label: "Obbiettivi", value: "goals" },
                                { label: "Budget", value: "budgets" }
                            ]}
                            onSelect={(value) => setType(value)}
                        />

                        {getType === "transactions" && (
                            <DropDown
                                label="Tipo transazione"
                                id="transactionType"
                                options={[
                                    { label: "Tutte", value: "" },
                                    { label: "Entrate", value: "entrata" },
                                    { label: "Uscite", value: "spesa" }
                                ]}
                                onSelect={(value) => setTransactionType(value)}
                            />
                        )}
                    </div>


                    <div className="inLine">
                        <div>
                            <DataInput
                                label="data iniziale*"
                                id="date_start"
                                name="date_start"
                                value={getStartDate}
                                onChange={(e) => setStartDate(e.target.value)}

                            />
                        </div>
                        <div>
                            <DataInput
                                label="data finale*"
                                id="date_end "
                                name="date_end"
                                value={getEndDate}
                                onChange={(e) => setEndDate(e.target.value)}

                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            id="general_filter"
                            className="buttonSend"
                            label="Cerca"
                            type="button"
                            onClick={handleTable}
                        />
                    </div>
                </div>


                <ConfirmModal
                    visible={selectedGoal !== null}
                    title="Aggiorna goal"
                    message={selectedGoal?.description}
                    current_message={`Aggiungi:.. Attuale: ${selectedGoal?.current_amount ?? 0}`}
                    showInput={true}
                    inputValue={getGoalValue}
                    onInputChange={setGoalValue}
                    onConfirm={handleConfirmGoal}
                    onCancel={closeGoalPopup}
                />


                {tableType === "goalTable" && (
                    <TableGoal
                        data={tableData}
                        onDelete={handleDelete}
                        onClean={handleClean}
                        onAdd={handleOpenAddGoal} />
                )}

                {tableType === "bugetTable" && (
                    <TableBudget
                        data={tableData}
                        onDelete={handleDelete}
                        onClean={handleClean} />
                )}

                {tableType === "transactionTable" && (
                    <TableTransaction
                        data={tableData}
                        onDelete={handleDelete}
                        onClean={handleClean} />
                )}
            </>
        )

    }