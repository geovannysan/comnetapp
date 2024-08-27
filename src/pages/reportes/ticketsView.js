import { useEffect, useState } from "react"
import { Departamento } from "util/User"
import { useSelector } from "react-redux"
import { Badge, Divider, Space } from 'antd';
import { Table, Tag } from 'antd';
import moment from "../../../node_modules/moment/moment";
import MainCard from "components/MainCard";
export default function TicktesVies() {
    let ticketss = useSelector((state) => state.menu.tickets)
    const columns = [
        {
            title: 'Asunto',
            dataIndex: 'asunto',
            key: 'asunto',
            render: (_, { asunto, departamentos, color }) => (<span><Badge  color={color}
                text={departamentos}
            /> <a>{asunto}</a></span>),
        },
        {
            title: 'Solicitante',
            dataIndex: 'solicitante',
            key: 'solicitante',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha_soporte',
            key: 'fecha_soporte',
        },
        {
            title: 'estado',
            key: 'estado',
            dataIndex: 'estado',
            render: (_, { departamentos, color }) => (
                <Tag color={color} >
                    {departamentos.toUpperCase()}
                </Tag>
            ),
        },
    ];

    return (
        <MainCard>
            <Table columns={columns} size="small" dataSource={ticketss.map(f => { return { ...f, fecha_soporte: moment(f.fecha_soporte).format('MM-DD-YYYY, h:mm:ss a') } })} />

        </MainCard>
    )
}