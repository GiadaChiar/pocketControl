// standdard form 



import "../style/form.scss"



// form html 
function Form() {
    return (
        <>
            <section id="form">
                <form target="_blank" action="https://formsubmit.co/giadachiara530@gmail.com" method="POST">
                    <input type="text" name="_honey" style={{ display: "none" }} />
                    <div id="formBlue">
                        <p id="question">Per maggiori informazioni, compila il modulo sottostante</p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-3">
                                    <label htmlFor="name" className="col-sm-3 col-form-label">Nome:*</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Mario" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="cognome" className="col-sm-3 col-form-label">Cognome:</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Rossi" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-sm-3 col-form-label">Email*</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" id="email" name="email" placeholder="mario.r@gmail.com" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="phone" className="col-sm-3 col-form-label">Telefono:*</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="phone" name="phone" placeholder="+39 333 1234567" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <p>testo:*</p>
                                    <textarea className="form-control" id="floatingTextarea" name="message" placeholder="Inserisci qui la tua richiesta..."
                                        style={{ height: "220px" }} required ></textarea>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary" id="submit">Invia</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Form;