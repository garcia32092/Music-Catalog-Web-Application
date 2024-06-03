import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';

const Success = () => {
    const [verified, setVerified] = useState(false);
    const [audioUrlMP3, setAudioUrlMP3] = useState(localStorage.getItem('audioUrlMP3') || '');
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('session_id');

    useEffect(() => {
        if (sessionId && !audioUrlMP3) {
            axios.post('/api/verify-payment', { sessionId })
                .then(response => {
                    if (response.data.verified) {
                        setAudioUrlMP3(response.data.urlMP3);
                        setVerified(true);
                        localStorage.setItem('audioUrlMP3', response.data.urlMP3);
                    }
                })
                .catch(error => {
                    console.error('Error verifying payment:', error);
                });
        } else if (audioUrlMP3) {
            setVerified(true);
        }
    }, [sessionId, audioUrlMP3]);

    return (
        <Container>
            {verified ? (
                <Box textAlign="center" mt={5}>
                    <Typography variant="h4" gutterBottom>
                        Thank you for your support!
                    </Typography>
                    <Box mt={8}>
                    <Typography variant="body1" gutterBottom>
                        You can now listen to or download the latest release:
                    </Typography>
                    </Box>
                    <Box mt={5}>
                        <Typography variant="h5" gutterBottom>
                            SONG TITLE
                        </Typography>
                        <audio controls style={{ width: '100%' }}>
                            <source src={audioUrlMP3} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </Box>
                    <Box mt={16} marginBottom={50}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            component={Link}
                            to="/"
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box textAlign="center" mt={20}>
                    <Typography variant="h4" gutterBottom>
                        Verifying payment...
                    </Typography>
                    <Box mt={30} marginBottom={50}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            component={Link}
                            to="/"
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Success;
