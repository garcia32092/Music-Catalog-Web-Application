import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Music.css';

const Music = ({ releases, onReleaseSelect }) => {
    const theme = useTheme();
    const [activeReleaseIndex, setActiveReleaseIndex] = useState(null);

    const handleReleaseClick = (release, index) => {
        setActiveReleaseIndex(index);
        onReleaseSelect(release);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const renderReleaseButtons = () => {
        return releases.map((release, index) => (
            <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
                <Card 
                    onClick={() => handleReleaseClick(release, index)}
                    className={`card ${activeReleaseIndex === index ? 'card-active' : ''}`}
                    sx={{
                        width: '100%',
                        height: {xs: '120px', sm: '250px'},
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={release.imageUrl}
                        alt={release.title}
                        sx={{
                            height: {xs: '50px', sm: '155px'}
                        }}
                    />
                    <CardContent style={{ backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#CCCCCC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography 
                            gutterBottom 
                            variant="body2" 
                            align="center"
                            sx={{
                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                            }}
                        >
                            {release.title}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.6rem', sm: '0.6rem' },
                            }}
                        >
                            {release.releaseType}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.4rem', sm: '0.7rem' },
                            }}
                        >
                            Released: {release.releaseDate}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    };

    return (
        <Container style={{ 
            marginTop: '10px', 
            marginBottom: '25px', 
            display: 'flex', 
            justifyContent: 'center' 
        }}>
            <Grid container spacing={4} style={{ 
                maxWidth: '100%', 
                display: 'flex', 
                justifyContent: 'center' 
            }}>
                {renderReleaseButtons()}
            </Grid>
        </Container>
    );
}

export default Music;
