export default function DataInput({
    id,
    label,
    name,
    value,
    onChange
}) {
    return (
        <div className="input-group mb-3 data">
            <span className="input-group-text">
                {label}
            </span>

            <input
                className="form-control"
                id={id}
                name={name}
                type="date"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}