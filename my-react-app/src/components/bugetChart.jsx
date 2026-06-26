import DataInput from "./datainput";
import PopUp from "./popUp";
import Button from "./button";
import RadialChart from "./charts/graphicRadialChart";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import { NeedleChar } from "../services/transactionService";



export default function BudgetChar() {
    const [getStartDate, setStartDate] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [chartData, setChartData] = useState([]);
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


            const res = await NeedleChar(start, end, "budgets");

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

            setChartData(res.date);

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
                    <h3 className ="charTitle">Tutti i Budgets</h3>
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
                        onClick={handleBugetChar}
                    />
                </div>
                </div>
            </div>
        </>
    )
}