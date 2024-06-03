import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider as MuiThemeProvider, Fab } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './components/ThemeContext';
import { useLocation } from 'react-router-dom';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import Success from './components/Success';
import Footer from './components/Footer';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
      AOS.init({
        duration: 1000,
      });
    }, [pathname]);
  
    return null;
  }

function App() {
    const { theme, toggleTheme } = useTheme();

    const muiTheme = createTheme({
        palette: {
            mode: theme
        },
        typography: {
            fontFamily: 'Custom-Arvo, sans-serif',
        },
    });

    useEffect(() => {
        document.body.style.backgroundColor = muiTheme.palette.background.default;
        document.body.style.color = muiTheme.palette.text.primary;

    }, [muiTheme]);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <Router basename="/">
                <ScrollToTop />
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/success" element={<Success />} />
                </Routes>
                <Footer />
                <Fab
                    aria-label="toggle theme" 
                    onClick={toggleTheme}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 1000,
                    }}>
                    {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </Fab>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
