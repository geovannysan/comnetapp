
import { Document, Page } from 'react-pdf';

export default function Facturapdf(props) {
    let { link } = props
    return (
        <iframe width={"100%"} height={"100%"} src={link}></iframe>)
}