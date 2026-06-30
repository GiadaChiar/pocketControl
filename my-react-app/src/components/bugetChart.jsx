import DataInput from "./datainput";

import { PopUp } from "./popUp";
import Button from "./button";
import BudgetLinearChart from "./charts/budget";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import { BugetsChar } from "../services/transactionService";
import { getCurrentMonthRange } from "../function/CurrentMonth";



export default function BudgetChar() {
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [chartData, setChartData] = useState([]);
    const [getTitle, setTitle] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });




    const loadChart = async (start = null, end = null) => {
        try {
            var title = null;
            if (start && end) {
                title = "Budget nel range selezionato";

                if (new Date(end) < new Date(start)) {
                    setPopup({
                        visible: true,
                        alert: "Attenzione",
                        message: "la data finale non può essere prima di quella iniziale",
                    });
                    return
                }
            } else {
                const dates = getCurrentMonthRange();
                start = dates.start;
                end = dates.end;
                title = "Buget di questo mese";
            }


            const res = await BugetsChar(start, end);

            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
                });
                return;
            }

            /*const formatted = formatPieData(res.data || []);
            setChartData(formatted);*/

            setChartData(res.data);
            setTitle(title);

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
    const handleBugetChar = () => {
        loadChart(getStartDate, getEndDate);
    };


    return (
        <>


            <div className="graphic" id="GoalsChart">

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
                        <h3 id="titleBuget" className="ChartH3">
                            {getTitle}
                        </h3>
                        <div className="goalsContainer">
                            {chartData.map((goal, index) => (
                                <BudgetLinearChart
                                    key={goal.id ?? index}
                                    result={goal}
                                />
                            ))}
                        </div>
                    </div>


                    <div className="inLine">


                        <div>
                            <DataInput
                                label="data iniziale"
                                id="date_Piegoal"
                                name="date_goal"
                                value={getStartDate}
                                onChange={(e) => setStartDate(e.target.value)}

                            />
                        </div>

                        <div>
                            <DataInput
                                label="data finale"
                                id="date_Piegoal"
                                name="date_goal"
                                value={getEndDate}
                                onChange={(e) => setEndDate(e.target.value)}

                            />
                        </div>


                    </div>
                    <div>
                        <Button
                            id="btn_GoalChart"
                            className="buttonSend"
                            label="Filtra"
                            type="button"
                            onClick={handleBugetChar}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}