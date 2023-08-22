import Select from 'react-select'
export default function Selectopction(props) {
    let { name, options, singleSelect, onChange, placeholder } = props
    function cambiar(e) {
        onChange(e)
    }
    return (
        <Select
            name={name}
            options={options}
            value={singleSelect}
            placeholder={placeholder}
            onChange={(value) => cambiar(value)}
        />
    )
}