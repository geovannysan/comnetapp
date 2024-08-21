import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../MainCard';
import { useSelector } from 'react-redux';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { Departamento } from 'util/User';
import { Chip } from '../../../node_modules/@mui/material/index';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();
    let ticketss = useSelector((state) => state.menu.soporte)
    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (location.pathname === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            }
            return false;
        });
    });

    // only used for component demo breadcrumbs
    if (location.pathname === '/breadcrumbs') {
        location.pathname = '/dashboard/analytics';
    }

    let mainContent;
    let itemContent;
    let breadcrumbContent = <Typography />;
    let itemTitle = '';

    // collapse item
    if (main && main.type === 'collapse') {
        mainContent = (
            <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
                {main.title}
            </Typography>
        );
    }

    // items
    if (item && item.type === 'item') {
        itemTitle = item.title;
        itemContent = (
            <Typography variant="subtitle1" color="textPrimary">
                {itemTitle}
            </Typography>
        );

        // main
        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <div>
                    <div className='d-flex flex-row justify-content-center'>
                        {
                            ticketss.length ?
                                ticketss.map((e, i) => {
                                    let sumaTotal = ticketss.reduce((acc, curr) => {
                                        return acc + curr.total;
                                    }, 0);
                                    let departamento = Departamento[e.dp]
                                    let colores = {
                                        "1": "warning",
                                        "2": "success",
                                        "4": "error",
                                        "5": "primary",
                                        "6": "error",
                                        "7": "secondary",
                                    }
                                    let colo = colores[e.dp] == undefined ? "error" : colores[e.dp]
                                    return (
                                        <Chip
                                            variant="combined"
                                            color={colo}
                                            label={"Tickets de " + departamento + " Total:" + e.total}
                                            sx={{ ml: 1.25, pl: 1 }}
                                            size="small"
                                        />

                                    )
                                })
                                : ""
                        }
                    </div>

                    <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                            <Grid item>
                                <MuiBreadcrumbs aria-label="breadcrumb">
                                    <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                                        Panel
                                    </Typography>
                                    {mainContent}
                                    {itemContent}
                                </MuiBreadcrumbs>
                            </Grid>
                            {title && (
                                <Grid item sx={{ mt: 2 }}>
                                    <Typography variant="h5">{item.title}</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </MainCard>
                </div>
            );
        }
    }

    return breadcrumbContent;
};

Breadcrumbs.propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.bool
};

export default Breadcrumbs;
