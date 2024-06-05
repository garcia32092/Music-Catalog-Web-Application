import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button, Container, Typography } from '@mui/material';
import FilterComponent from './Filter';
import SearchComponent from './Search';
import FilterReleases from './FilterReleases';
import Music from './Music';
import { useTheme } from '@mui/material/styles';
import NorthIcon from '@mui/icons-material/North';

const releaseTypeOptions = ["Single", "Album", "Mixtape", "Video"];
const PAGE_SIZE = 8;
const MAX_ITEMS = 500; // Max item limit to prevent performance issues

const MainPage = () => {
    const [releases, setReleases] = useState([]);
    const [filteredReleases, setFilteredReleases] = useState([]);
    const [selectedRelease, setSelectedRelease] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const officialiframeStyle = window.innerWidth <= 768 ? 
        { maxWidth: '100%', height: '152px' } : 
        { maxWidth: '100%', height: '352px' };
    const soundCloudiframeStyle = window.innerWidth <= 768 ? 
        { maxWidth: '100%', height: '152px' } : 
        { maxWidth: '100%', height: '275px' };
    const youTubeiframeStyle = window.innerWidth <= 768 ? 
        { border: 'none', maxWidth: '100%', height: '195px' } : 
        { border: 'none', maxWidth: '100%', height: '325px' };

    const currentReleases = filteredReleases.slice(0, currentPage * PAGE_SIZE);

    const timeoutIdRef = useRef();

    const loadMoreItems = useCallback(() => {
        if (currentReleases.length >= filteredReleases.length || currentPage * PAGE_SIZE >= MAX_ITEMS) {
            setLoading(false);
            return;
        }
        setLoading(true);
        
        timeoutIdRef.current = setTimeout(() => {
            setCurrentPage(prevPage => prevPage + 1);
            setLoading(false);
        }, 300); // 300 milliseconds = 0.3 second
    }, [currentPage, currentReleases.length, filteredReleases.length]);

    useEffect(() => {
        const getReleases = async () => {
            try {
                const response = await fetch('/api/getReleases');
                const data = await response.json();
                setReleases(data);
                setFilteredReleases(data);
                if (data.length > 0) {
                    setSelectedRelease(data[0]);
                }
            } catch (error) {
                console.error('Error fetching releases', error);
            }
        };

        getReleases();
    }, []);

    useEffect(() => {
        const filtered = FilterReleases(releases, { searchTerm, filterType });
        setFilteredReleases(filtered);
        if (filtered.length > 0) {
            setSelectedRelease(filtered[0]);
        } else {
            setSelectedRelease(null);
        }
    }, [searchTerm, filterType, releases]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMoreItems();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutIdRef.current);
        };
    }, [loadMoreItems]);

    const renderURLEmbed = () => {
        if (selectedRelease && selectedRelease.releaseType !== "Video") {
            if (selectedRelease.platform === "Official") {
                return (
                    <iframe
                        title={`${selectedRelease.title} Widget`}
                        width="100%"
                        scrolling="no"
                        frameborder="0"
                        src={selectedRelease.embedUrl}
                        style={officialiframeStyle}>
                    </iframe>
                );
            } else if (selectedRelease.platform === "Unreleased") {
                return (
                    <div>
                        <stripe-buy-button
                            buy-button-id="buy_btn_1PN1CnIy1NGnnLPhDr01q9ew"
                            publishable-key="pk_test_51PMyJDIy1NGnnLPhPYhflDTr5hpA7Vij2ykfunrf63cERB5qdJ4UtzOrMhXF2VhNFQyEGNJ3TVKyDg3UTOcuu7eE0060ibMRym"
                        >
                        </stripe-buy-button>
                    </div>
                );
            } else {
                return (
                    <iframe
                        title={`${selectedRelease.title} Widget`}
                        width="100%"
                        scrolling="no"
                        frameborder="0"
                        src={selectedRelease.embedUrl}
                        style={soundCloudiframeStyle}>
                    </iframe>
                );
            }
        } else {
            return (
                <iframe
                    title={`${selectedRelease.title} Video`}
                    src={selectedRelease.embedUrl}
                    width="575"
                    style={youTubeiframeStyle}
                    allowFullScreen>
                </iframe>
            );
        }
    };

    const renderLinkshareEmbed = () => {
        if (selectedRelease && selectedRelease.linkshareURL && selectedRelease.releaseType !== "Video") {
            return (
                <iframe
                    title={`${selectedRelease.title} Linkshare`}
                    src={selectedRelease.linkshareURL}
                    width="100%"
                    height="52"
                    scrolling="no"
                    frameborder="0"
                    style={{ marginTop: '25px', maxWidth: '100%' }}>
                </iframe>
            );
        } else if (selectedRelease && selectedRelease.releaseType === "Video") {
            if (selectedRelease.linkshareURL) {
                return (
                    <iframe
                    title={`${selectedRelease.title} Linkshare`}
                    src={selectedRelease.linkshareURL}
                    width="100%"
                    height="52"
                    scrolling="no"
                    frameborder="0"
                    style={{ marginTop: '25px', maxWidth: '100%' }}>
                </iframe>
                );
            }
        } else {
            return (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{
                        marginTop: '20px',
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                    }}
                >
                    <NorthIcon/> This release is not on streaming platforms <NorthIcon/>
                </Typography>
            );
        }
    };

    const renderNoResultsMessage = () => {
        return (
            <Typography
                variant="h6"
                align="center"
                sx={{
                    marginTop: '20px',
                    fontSize: { xs: '1.25rem', sm: '1.75rem' },
                }}
            >
                No songs found.
            </Typography>
        );
    };

    return (
        <Container style={{
            marginTop: '25px',
            marginBottom: '25px',
            backgroundColor: theme.palette.background.default,
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center' }}>
            {selectedRelease && (
                <>
                    <Typography
                        variant="h6"
                        align="center"
                        color={theme.palette.text.primary}
                        sx={{
                            fontSize: { xs: '1.05rem', sm: '1.25rem' },
                        }}
                    >
                        {selectedRelease.title}
                    </Typography>
                    {renderURLEmbed()}
                    {renderLinkshareEmbed()}
                </>
            )}
            <Container style={{
                backgroundColor: theme.palette.background.default,
                marginTop: '20px',
                marginBottom: '1px',
                padding: '1px'
                }}>
                <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                    <Grid item xs={2} sm={6} md={4} lg={3}>
                        <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </Grid>

                    <Grid item container xs={8} sm={6} md={8} lg={9} justifyContent="flex-end" alignItems="center" spacing={1}>
                        <Grid item>
                            <FilterComponent filterType={filterType} setFilterType={setFilterType} filterOptions={releaseTypeOptions} />
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => setFilterType('')}
                                sx={{
                                    width: { xs: '50px', sm: '118px' },
                                    fontSize: {xs: '0.7rem', sm: '0.86rem'}
                                }}>
                                Clear Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* Render other filters as needed */}

            <Typography
                variant="releasesNum"
                align="center"
                sx={{
                    marginTop: '15px',
                    marginBottom: '10px',
                    fontSize: { xs: '0.75rem', sm: '1rem' }
                }}
            >
                Total Releases Found: {filteredReleases.length}
            </Typography>

            <Music releases={currentReleases} onReleaseSelect={setSelectedRelease} theme={theme} />

            {filteredReleases.length === 0 && searchTerm !== '' && renderNoResultsMessage()}

            {loading && currentReleases.length < filteredReleases.length && (
                <Typography>Loading...</Typography>
            )}
        </Container>
    );
}

export default MainPage;
