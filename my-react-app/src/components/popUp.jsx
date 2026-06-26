// Pop to show messages




export default function PopUp({ alert, message, onClose }) {
    return (
        <>
            <div className="custom-popup">
                <div className="popup-box">
                    <h4>{alert}</h4>
                    <p>{message}</p>
                    <button onClick={onClose}>
                        Chiudi
                    </button>
                </div>
            </div>
        </>
    );
}



/*
       const handleBarChar = async () => {
   
           if (getEndDate && getStartDate) {
   
               if (new Date(getEndDate) < new Date(getStartDate)) {
                   setPopup({
                       visible: true,
                       alert: "Attenzione",
                       message: "la data finale non può essere prima di quella iniziale",
                   });
                   return
               }
           }
   
           try {
       
               const res = await BarCharDate(
                   getStartDate || null,
                   getEndDate || null
               )
               if (res.success === false) {
                   setPopup({
                       visible: true,
                       alert: "Attenzione",
                       message: res.error,
                   });
               }
               if (res.success === true) {
                   const formatted = formatChartData(res.data)
                   setChartData(formatted);
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
   
       console.log("chartstart", getEndDate);
       console.log("chartEnd", getStartDate);
   */