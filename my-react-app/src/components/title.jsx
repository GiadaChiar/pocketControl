//title 



export default function Title({ classname, id, text }
) {
    return (
        <h1
            id={id}
            className={classname}>
            {text}
        </h1>
    );
}