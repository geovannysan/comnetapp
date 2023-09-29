import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { ListarReportes } from '../../util/Queryportal';
import { Listareportes } from 'util/Querireport';

// chart options


// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = () => {
    const [dia, seDias] = useState([])
    const [valor,setValor]=useState(0)
    const columnChartOptions = {
        chart: {
            type: 'bar',
            height: 430,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                borderRadius: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 8,
            colors: ['transparent']
        },
       
        yaxis: {
            title: {
                text: '$ recudado'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `$ ${val} `;
                }
            }
        },
        legend: {
            show: true,
            fontFamily: `'Public Sans', sans-serif`,
            offsetX: 10,
            offsetY: 10,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: '50%',
                offsexX: 2,
                offsexY: 2
            },
            itemMargin: {
                horizontal: 15,
                vertical: 50
            }
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    };
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

    const [series, setSerial] = useState([
        {
            name: 'Subtotal',
            data: []
        },
        {
            "name": "Total",
            "data": [
            ]
        }
    ]);

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {

        Listareportes().then(salida => {
            if (salida.success) {
                console.log(salida)
                const subtotalSum = salida.data.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
                setValor(subtotalSum)
            }
            const subtotalData = {
                name: 'Subtotal',
                data: []
            };

            const totalData = {
                name: 'Total',
                data: []
            };
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

            // Función para convertir fecha a día de la semana
            function convertDateToDay(dateString) {
                const date = new Date(dateString);
                const dayIndex = date.getDay();
                return dayNames[dayIndex];
            }
            // Procesar los resultados y llenar los datos de subtotal y total
            salida.data.forEach(result => {
                const category = result.dia;
                const subtotal = parseFloat(result.subtotal.toFixed(2)); // Redondear a 2 decimales
                const total = parseFloat(result.total.toFixed(2)); // Redondear a 2 decimales

                // Agregar los valores a los arrays de datos
                subtotalData.data.push(subtotal);
                totalData.data.push(total);
            });
            const daysArray = salida.data.map(result => convertDateToDay(result.dia));
            seDias(daysArray)
            setOptions((prevState) => ({
                ...prevState,
                colors: [warning, primaryMain],
                xaxis: {
                    categories: [
                        ...daysArray
                    ]
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: [secondary]
                        }
                    }
                },
                grid: {
                    borderColor: line
                },
                tooltip: {
                    theme: 'light'
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    labels: {
                        colors: 'grey.500'
                    }
                }
            }));
            console.log(daysArray)
            console.log(salida)
            // Crear el array final con los datos de subtotal y total
            const finalDataArray = [subtotalData, totalData];
            setSerial(finalDataArray)
            console.log(finalDataArray)
        }).catch(err => {
            console.log(err)
        })
       
    }, [primary, secondary, line, warning, primaryMain, successDark]);

    return (
        <div id="chart">
           <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    );
};

export default SalesColumnChart;