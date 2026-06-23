//create standard input




export default function Input({ id, type, placeholder, value, id_span, text_span, onChange, ...props }) {
    return (

        <div className="input-group mb-3">
            <span className="input-group-text"
                id={id_span}>{text_span}</span>
            <input
                className="form-control"
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}



