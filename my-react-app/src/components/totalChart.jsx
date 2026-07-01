
import { PopUp } from "./popUp";
import "../style/popUp.scss";
import { useState, useEffect } from "react";
import TotalChart from "./charts/graphicTotalChart";
import { Total } from "../services/transactionService";


export default function TotalChar() {

    const [balance, setBalance] = useState(0);
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    const loadChart = async () => {
        try {

            const res = await Total();
            if (res.success === true) {
                setBalance(res.data ?? 0);
            }
            if (res.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: res.error,
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

    //start dowload 
    useEffect(() => {
        (async () => {
            await loadChart();
        })();
    }, []);


    return (
        <>

            <div className="graphic" id="TotalChart">

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
                        Saldo Totale:
                    </h3>
                    <TotalChart total={balance} />
                </div>
            </div>
        </>
    )
}