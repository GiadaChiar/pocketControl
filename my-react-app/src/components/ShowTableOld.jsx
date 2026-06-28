
import Button from "./button";
import DataInput from "./datainput";
import { useState } from "react";
import PopUp from "../components/popUp";
import DropDown from "../components/dropdown";
import { TableGoal, TableBudget, TableTransaction } from "./Tables";
import { FiltersTable } from "../services/filterServices";
import { DeleteFilterTable } from "../services/filterServices";
import "../style/popUp.scss";


export default function ShowTable() {
    const [getType, setType] = useState("");
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");

    const [tableType, setTableType] = useState("");
    const [tableData, setTableData] = useState([]);


    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const handleClean = () => {
        setTableData([]);
    };




    const handleDelete = async (id) => {

        console.log("passo a delete ", id , getType)
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
        } catch (error){
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

            {tableType === "goalTable" && (
                <TableGoal
                    data={tableData}
                    onDelete={handleDelete}
                    onClean={handleClean} />
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