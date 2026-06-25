


export function TableGoal({data=[], onDelete, onClean}) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr className="table-primary table-hover">
                        <th scope="col">Obbiettivo</th>
                        <th scope="col">Attuale</th>
                        <th scope="col">Data</th>
                        <th scope="col">Descrizione</th>
                        <th>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={onClean}
                            >
                                ✕
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.target_amount}</td> 
                            <td>{row.current_amount}</td> 
                            <td>{row.date}</td> 
                            <td>{row.description}</td> 
                            <td><button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(row.id)}
                            >
                                ✕
                            </button>
                            </td>
                        </tr>   
                        
                            ))}
                </tbody>
            </table>
        </>
    )
}



export function TableBudget({ data = [], onDelete, onClean }) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr className="table-primary table-hover">
                        <th scope="col">Budget</th>
                        <th scope="col">Inizio</th>
                        <th scope="col">Fine</th>
                        <th scope="col">Descrizione</th>
                        <th>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={onClean}
                            >
                                ✕
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.limit_amount}</td>
                            <td>{row.start_date}</td>
                            <td>{row.end_date}</td>
                            <td>{row.description}</td>
                            <td><button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(row.id)}
                            >
                                ✕
                            </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    )
}





export function TableTransaction({ data = [], onDelete , onClean}) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr className="table-primary table-hover">
                        <th scope="col">Somma</th>
                        <th scope="col">Tipologia</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Data</th>
                        <th scope="col">Descrizione</th>
                        <th>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={onClean}
                            >
                                ✕
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.amount}</td>
                            <td>{row.type}</td>
                            <td>{row.category}</td>
                            <td>{row.date}</td>
                            <td>{row.description}</td>
                            <td><button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(row.id)}
                            >
                                ✕
                            </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    )
}



