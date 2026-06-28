import DataInput from "./datainput";
import PopUp from "./popUp";
import Button from "./button";
import RadialChart from "./charts/graphicRadialChart";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import { NeedleChar } from "../services/transactionService";
import { getCurrentMonthRange } from "../function/CurrentMonth";
//import { formatPieData } from "../function/FormatData";


export default function GoalChar() {
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
                title = "Obbiettivi nel range selezionato";
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

                console.log("eeend ....", end);
                title = "Obbiettivi di questo mese";
            }


            const res = await NeedleChar(start, end, "goals");

            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
                });
                return;
            }


            setChartData(res.date);
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
    const handleGoalChar = () => {
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
                        <h3 id="titleGoal" className="ChartH3">
                            {getTitle}
                        </h3>
                        <div className="goalsContainer">
                            {chartData.map((goal, index) => (
                                <RadialChart
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
                            onClick={handleGoalChar}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}