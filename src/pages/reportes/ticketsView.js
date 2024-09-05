import { useEffect, useRef, useState } from "react"
import { Departamento } from "util/User"
import { useDispatch, useSelector } from "react-redux"
import { Badge, Divider, Space } from 'antd';
import { Table, Tag, Input } from 'antd';
import moment from "../../../node_modules/moment/moment";
import MainCard from "components/MainCard";

import Highlighter from 'react-highlight-words';
import { SearchOffOutlined } from "../../../node_modules/@mui/icons-material/index";
import { setSoporte, setTickets } from "store/reducers/menu";
import { Listar_tickets, Listar_tickets_Abierto, Listar_tickets_Abiertos } from "util/Queryportal";
export default function TicktesVies() {
    let usedispatch = useDispatch()
    let ticketss = useSelector((state) => state.menu.tickets)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Asunto',
            dataIndex: 'asunto',
            key: 'asunto',
            render: (_, { asunto, departamentos, color }) => (<span><Badge color={color}
                text={departamentos}
            /> <a>{asunto}  </a></span>),

        },
        {
            title: 'Solicitante',
            dataIndex: 'solicitante',

            key: 'solicitante',
            render: (_, { solicitante, idcliente }) => (
                <a>{solicitante || "idCliente: "+idcliente}</a>
            )
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha_soporte',
            key: 'fecha_soporte',
        },

        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            filters: [
                {
                    text: 'Abierto',
                    value: 'abierto',
                },
                {
                    text: 'Respondido',
                    value: 'respondido',
                },
            ],
            onFilter: (value, record) => record.estado.indexOf(value) === 0,
        },
        {
            title: 'Departamento',
            key: 'ddepartamentos',
            dataIndex: 'departamentos',
            render: (_, { departamentos, color }) => (
                <Tag color={color} >
                    {departamentos.toUpperCase()}
                </Tag>
            ),
        },
    ];
    async function Tickets() {
        // let tickets = JSON.parse(localStorage.getItem("ticktes"))
        let { data } = await Listar_tickets_Abiertos();
        //console.log(tickets);
        console.log(data)
        if (data.success) {


            console.log("use", data.data.lista);
            // usedispatch(setSoporte({ soporte: [...data.data.lista] }))
            usedispatch(setTickets({ tickets: [...data.data.lista] }));
            // localStorage.setItem("ticktes", JSON.stringify([...data.data.tickets]))


            //playAudiosSequentially(data.data.tickets);


        }
        // console.log(data);
    }
    useEffect(() => {

        Tickets()
    }, [])
    return (
        
            <Table
                columns={columns}
                size="small"
                bordered
                dataSource={ticketss.map(f => { return { ...f, fecha_soporte: moment(f.fecha_soporte).format('MM-DD-YYYY, h:mm:ss a') } })}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />

        
    )
}