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