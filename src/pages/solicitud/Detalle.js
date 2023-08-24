import { Grid } from "@mui/material"
import { Typography } from 'antd';

const { Title } = Typography
import MainCard from "components/MainCard"
import { useEffect } from "react";
import { useParams } from "react-router";
export default function DetallesView() {
    let { id } = useParams()
    useEffect(() => {

    }, [])
    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>

                <Grid item xs={12} md={7}>
                    <MainCard>
                        <Grid xs={6}></Grid>
                        <Grid className="mx-auto">
                            <Typography variante="h1" gutterBottom>
                                <Title>h1. Ant Design</Title>
                                <Title level={2}>h2. Ant Design</Title>
                                <Title level={3}>h3. Ant Design</Title>
                                <Title level={4}>h4. Ant Design</Title>
                                <Title level={5}>h5. Ant Design</Title> </Typography>
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={5}>
                    <MainCard>
                        hshfs
                    </MainCard>

                </Grid>


            </Grid>
        </>
    )
}