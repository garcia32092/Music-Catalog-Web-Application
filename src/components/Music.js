import React, { Component } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import './Music.css';

class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeReleaseIndex: null,
        };
        this.handleReleaseClick = this.handleReleaseClick.bind(this);
    }

    handleReleaseClick(release, index) {
        this.setState({ activeReleaseIndex: index });
        this.props.onReleaseSelect(release);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    renderReleaseButtons() {
        const { releases, theme } = this.props;
        const { activeReleaseIndex } = this.state;

        return releases.map((release, index) => (
            <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
                <Card 
                    onClick={() => this.handleReleaseClick(release, index)}
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
    }

    render() {
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
                    {this.renderReleaseButtons()}
                </Grid>
            </Container>
        );
    }
}

export default Music;
