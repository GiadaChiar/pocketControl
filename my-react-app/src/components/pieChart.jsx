import DataInput from "./datainput";
import { PopUp } from "./popUp";
import Button from "./button";
import PieChartWith from "./charts/graphicPieChart";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import { PieCharDate } from "../services/transactionService";
import { formatPieData } from "../function/FormatData";
import DropDown from "../components/dropdown";

export default function PieChar() {
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [chartData, setChartData] = useState([]);
    const [getTitle, setTitle] = useState("");
    const [getType, setType] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });




    const loadChart = async (start = null, end = null, type = null) => {
        try {

            if (start && end && new Date(end) < new Date(start)) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "la data finale non può essere prima di quella iniziale",
                });
                return
            }

            const res = await PieCharDate(start, end, type);

            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
                });
                return;
            }

            const formatted = formatPieData(res.data || [])
            if (formatted.length === 0) {
                setChartData([
                    {
                        name: "Nessun dato",
                        value: 0
                    }

                ])
                setTitle("");
            } else {
                setChartData(formatted);
                setTitle(res.title);
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

    //start dowload 
    useEffect(() => {
        (async () => {
            await loadChart();
        })();
    }, []);


    //if I click filter 
    const handlePieChar = () => {
        loadChart(getStartDate, getEndDate, getType);
    };


    return (
        <>


            <div className="graphic  dashboard-layout" id="PieChart">

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


                <h3 id="titleBuget" className="ChartH3">
                    {getTitle || "Nessun valore di spesa questo mese"}
                </h3>

                <div className="chartSection">
                    <div className="chartSide">
                        <div className="chartWrapperBar">
                            <PieChartWith data={chartData} />
                        </div>
                    </div>

                    <div className="filterSide">
                        <div className="inputsRow">
                            <DataInput
                                label="data iniziale"
                                id="date_goal"
                                name="date_goal"
                                value={getStartDate}
                                onChange={(e) => setStartDate(e.target.value)}

                            />

                            <DataInput
                                label="data finale"
                                id="date_goal"
                                name="date_goal"
                                value={getEndDate}
                                onChange={(e) => setEndDate(e.target.value)}

                            />
                        </div>


                        <div className="drop_chart">
                            <DropDown
                                label="Tipologia"
                                id="type_drop"
                                options={[
                                    { label: "Entrate", value: "entrata" },
                                    { label: "Spese", value: "spesa" }
                                ]}
                                onSelect={(value) => setType(value)}
                            />
                        </div>

                        <div className="buttonRow">
                            <Button
                                id="btn_PieChart"
                                className="buttonSend"
                                label="Filtra"
                                type="button"
                                onClick={handlePieChar}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}