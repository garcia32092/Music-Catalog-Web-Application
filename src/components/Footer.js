import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Container component="footer" style={{ padding: '5px', backgroundColor: theme.palette.background.default, textAlign: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleScrollToTop}
            ><ArrowUpwardIcon />
            </Button>
            <Typography sx={{ mt: 3 }} variant="body1" gutterBottom>
                Music Catalog
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }} gutterBottom>
                Alex's Music LLC
            </Typography>
            <Box
                sx={{ mt: 3 }}>
                <img
                    src={process.env.PUBLIC_URL + theme.palette.mode === 'dark' ? "/WhiteLogo.png" : "/BlackLogo.png"}
                    alt="Sample Logo"
                    width="75"
                    height=""
                />
            </Box>
        </Container>
    );
};

export default Footer;
