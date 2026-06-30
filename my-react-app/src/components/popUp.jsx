// Pop to show messages




export function PopUp({ alert, message, current_message, onClose }) {
    return (
        <>
            <div className="custom-popup">
                <div className="popup-box">
                    <h4>{alert}</h4>
                    <p>{message}</p>
                    <p>{current_message}</p>
                    <button onClick={onClose}>
                        Chiudi
                    </button>
                </div>
            </div>
        </>
    );
}


//pop-up delete or update goals

import { useState, useEffect } from "react";
export function ConfirmModal({
    visible,
    title = "Conferma azione",
    message,
    current_message,
    showInput = false,
    inputValue = "",
    onInputChange,
    inputType = "number",
    confirmText = "Conferma",
    cancelText = "Annulla",
    onConfirm,
    onCancel,
}) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (visible) {
            setValue(inputValue ?? "");
        }
    }, [visible, inputValue]);

    if (!visible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">

                <h4>{title}</h4>

                {message && <p>{message}</p>}
                {current_message && <p>{current_message}</p>}

                {showInput && (
                    <input
                        type={inputType}
                        className="form-control"
                        value={value}
                        onChange={(e) => onInputChange(e.target.value)}
                    />
                )}

                <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        {cancelText}
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() => onConfirm(value)}
                    >
                        {confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
}