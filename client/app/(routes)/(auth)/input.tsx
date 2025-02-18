export default function Input({
    type,
    name,
    placeholder
} : {
    type: string,
    name: string,
    placeholder: string
}) {
    return (
        <input className="p-1 rounded-md" type={type} name={name} required placeholder={placeholder} />
    );
}