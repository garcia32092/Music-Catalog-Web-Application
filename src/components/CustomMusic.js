// CustomMusic.js to meet requirements by demonstrating polymorphism by overriding renderReleaseButtons method with custom rendering
import React from 'react';
import Music from './Music';

class CustomMusic extends Music {
    renderReleaseButtons() {
        // Custom rendering
        const { releases, theme } = this.props;
        const { activeReleaseIndex } = this.state;

        return releases.map((release, index) => (
            <Grid item key={index} xs={12}>
                <Card 
                    onClick={() => this.handleReleaseClick(release, index)}
                    className={`card ${activeReleaseIndex === index ? 'card-active' : ''}`}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={release.imageUrl}
                        alt={release.title}
                        sx={{
                            width: { xs: '30%', sm: '20%' },
                        }}
                    />
                    <CardContent style={{ backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#CCCCCC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography 
                            gutterBottom 
                            variant="body2" 
                            align="left"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.2rem' },
                            }}
                        >
                            {release.title}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                            }}
                        >
                            {release.releaseType}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.6rem', sm: '0.8rem' },
                            }}
                        >
                            Released: {release.releaseDate}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    }
}

export default CustomMusic;
