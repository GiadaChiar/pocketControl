//props to pass to Button




export default function Button({ className, id, label, type, onClick }
) {
    return (
        <button
            id={id}
            className={className}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    );
}