import Input from "./input";
import Button from "./button";
import DataInput from "./datainput";
import { useState, useEffect } from "react";
import { PopUp } from "../components/popUp";
import DropDown from "../components/dropdown";
import { NewTransation } from "../services/transactionService";
import "../style/popUp.scss";
import { CategoriesFetch } from "../api/transactionApi";

export default function CollapseTransation() {
    const [getCategory, setCategory] = useState("");
    const [getType, setType] = useState("");
    const [getAmount, setAmount] = useState("");
    const [getDescription, setDescription] = useState("");
    const [getDate, setDate] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [popup, setPopup] = useState({
        visible: false,
        alert: "",
        message: ""
    });

    //search category
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await CategoriesFetch();
                console.log("categories response:", response);
                if (response.success === false) {
                    setPopup({
                        visible: true,
                        alert: "Attenzione",
                        message: response.error,
                    });
                    return;
                } if (response.success === true) {
                    Array.isArray(response.data)
                        ? response.data
                        : []

                    setCategories(response.data);
                    console.log(response.data)
                }
            } catch {
                setPopup({
                    visible: true,
                    alert: "Problemi Tecnici",
                    message: "La richiesta non è andata a buon fine. Ricarica la pagina."
                });
            }
        }
        loadCategories();
    }, []);


    const handleTransection = async () => {
        if (getAmount === "" || getAmount <= 0 || !getType || !getDate) {
            setPopup({
                visible: true,
                alert: "Attenzione",
                message: "Compila tutti i capi obbligatotri, non sono ammaessi valori uguali o inferiori allo zero",
            });
            return;
        }

        const categoryToSave =
            getCategory === "custom"
                ? customCategory
                : getCategory;

        try {
            const user = await NewTransation(
                categoryToSave,
                getType,
                Number(getAmount),
                getDate,
                getDescription || null

            );

            if (user.success === false) {
                setPopup({
                    visible: true,
                    alert: "Attenzione",
                    message: user.error,
                });
            }
            if (user.success === true) {
                setPopup({
                    visible: true,
                    alert: "Registrazione eseguita",
                    message: "Obbiettivo inserito"
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


    return (
        <>
            <button
                className="btn btn-primary"
                id="TransactionButton"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#TransactionCollapse"
                aria-expanded="false"
                aria-controls="filterCollapse"
            >
                Nuovo Inserimento
            </button>
            <div className="collapse" id="TransactionCollapse">
                <form id="filter"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleTransection();
                    }}>
                    <div className="card card-body" id="filterSection">

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
                            <DropDown
                                label="Tipologia"
                                id="type_drop"
                                options={[
                                    { label: "Entrata", value: "entrata" },
                                    { label: "Spesa", value: "spesa" }
                                ]}
                                onSelect={(value) => setType(value)}
                            />

                            <DropDown
                                label="Categoria"
                                id="category_drop"
                                options={[
                                    ...categories.map(cat => ({
                                        label: cat.category,
                                        value: cat.category
                                    })),
                                    {
                                        label: "➕ Nuova categoria",
                                        value: "custom"
                                    }
                                ]}
                                onSelect={(value) => setCategory(value)}
                            />


                            {getCategory === "custom" && (
                                <Input
                                    id="custom_type"
                                    type="text"
                                    placeholder="Inserisci tipologia personalizzata"
                                    id_span="custom_span"
                                    text_span="Altro"
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                />
                            )}
                        </div>

                        <div className="inLine">
                            <div>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="1500,75"
                                    id_span="amount_span"
                                    text_span="Cifra"
                                    onChange={(e) =>
                                        setAmount(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <DataInput
                                    label="data"
                                    id="date_transation"
                                    name="date_transation"
                                    value={getDate}
                                    onChange={(e) => setDate(e.target.value)}

                                />
                            </div>
                            <div>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="pizzata di classe"
                                    id_span="description_span"
                                    text_span="Descrizione*"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                id="btn_Goal"
                                className="buttonSend"
                                label="Inserisci"
                                type="button"
                                onClick={handleTransection}
                            />
                        </div>
                    </div>
                </form>
            </div>

        </>
    )

}