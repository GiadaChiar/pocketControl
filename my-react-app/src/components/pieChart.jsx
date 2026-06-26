import DataInput from "./datainput";
import PopUp from "./popUp";
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
    const [getType, setType] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });




    const loadChart = async (start = null, end = null) => {
        try {

            if (start && end && new Date(end) < new Date(start)) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "la data finale non può essere prima di quella iniziale",
                });
                return
            }


            const res = await PieCharDate(start, end, getType);

            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
                });
                return;
            }

            const formatted = formatPieData(res.data || []);
            setChartData(formatted);

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
        loadChart(getStartDate, getEndDate);
    };


    return (
        <>


            <div className="graphic" id="PieChart">

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
                <div className="chartWrapperBar">
                    <h3 class="charTitle">Divisione delle spese o delle entrate per mese</h3>
                    <PieChartWith data={chartData} />
                </div>


                <div className="inLine">

                <DropDown
                    label="Tipologia"
                    id="type_drop"
                    options={[
                        { label: "Entrate", value: "entrata" },
                        { label: "Spese", value: "spesa" }
                    ]}
                    onSelect={(value) => setType(value)}
                />

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


                </div>
                <div>
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
        </>
    )
}