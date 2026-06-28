import DataInput from "./datainput";
import PopUp from "./popUp";
import Button from "./button";
import SimpleBarChart from "./charts/graphicBarChar";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import { BarCharDate } from "../services/transactionService";
import { AreaChartExample } from "./charts/graphicAreaChar";
import { formatChartData } from "../function/FormatData";


export default function BarChar() {
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

            if (start && end && new Date(end) < new Date(start)) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: "la data finale non può essere prima di quella iniziale",
                });
                return
            }

            const res = await BarCharDate(start, end);

            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
                });
                return;
            }

            const formatted = formatChartData(res.data || []);
            setChartData(formatted);
            setTitle(res.title)

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
    const handleBarChar = () => {
        loadChart(getStartDate, getEndDate);
    };


    return (
        <>


            <div className="graphic" id="BarChart">


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

                <div className="chartWrapperBar">
                    <h3 id="titleBuget" className="ChartH3">
                        {getTitle}
                    </h3>
                    <div className="inLine">
                        
                        <SimpleBarChart data={chartData} />

                        <AreaChartExample data={chartData} />
                    </div>
                </div>

                <div className="inLine">

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
                        id="btn_BurChart"
                        className="buttonSend"
                        label="Filtra"
                        type="button"
                        onClick={handleBarChar}
                    />
                </div>
            </div>
        </>
    )
}