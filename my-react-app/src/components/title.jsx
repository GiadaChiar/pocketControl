//title 



export default function Title({ className, id, text }
) {
    return (
        <h1
            id={id}
            className={className}>
            {text}
        </h1>
    );
}