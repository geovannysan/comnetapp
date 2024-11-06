import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

import { Spin, notification } from 'antd';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Logearse } from '../../../util/Queryportal';
import { useDispatch } from 'react-redux';
import { setDatosuser, setlogin } from '../../../store/reducers/menu';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    let usedispat = useDispatch()

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: "" + mensaje,
            description:
                "" + description,
            placement: 'bottom'
        });
    };
    function iniciarsecion(user, passw) {
        let info = {
            username: user.trim(),
            password: passw.trim()
        }
        console.log(user, passw)
        Logearse(info).then(oupt => {
            if (oupt.estado && oupt.estado != "error") {
                sessionStorage.setItem("USERLOGIN", JSON.stringify({ ...oupt.user }))
                usedispat(setDatosuser({ ...oupt.user }))
                usedispat(setlogin({ estado: true }))
                window.location.reload();
                setTimeout(function () {
                    
                    window.location("/dashboard/panel")
                }, 1000)

                // history("/dashboard/panel")
                return
            } else {
                // openNotificationWithIcon('error', "Alerta", "Hubo un error contraseña o usuario incorecto" )

                // alert(""+JSON.stringify(oupt))
            }
            openNotificationWithIcon('error', "Alerta", "Hubo un error contraseña o usuario incorecto")


            console.log(oupt)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            {contextHolder}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().max(255).required('Usuario es requiredo'),
                    password: Yup.string().max(255).required('Password es requiredo')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(values)
                        iniciarsecion(values.email, values.password)
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Username </InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Usuario"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="contraseña"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>


                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Entrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login </Typography>
                                </Divider>
                            </Grid>

                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
