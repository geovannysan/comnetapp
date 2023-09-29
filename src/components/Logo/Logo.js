// material-ui
//import { useTheme } from '@mui/material/styles';
//import logo from '/images/logo.svg';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
 //   const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *fill={theme.palette.primary.dark}
          fill={theme.palette.primary.main}
         */
        <>
            <img src={"/img/logo.svg"} alt="Mantis" width="100" />
        </>
    );
};

export default Logo;
