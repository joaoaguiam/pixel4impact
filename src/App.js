import React, { Component } from 'react'

// import Foundation from 'react-foundation';

// import { Link } from 'react-router'
// import 'normalize.css';
// import Header from './components/header/Header'
// import SideBar from './layouts/sidebar/SideBar'

// Styles
// import 'font-awesome/css/font-awesome.css';
// import 'font-awesome/scss/font-awesome.scss';

import '../lib/font-awesome/web-fonts-with-css/css/fontawesome-all.css';


import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// import 'foundation-sites/dist/css/foundation.min.css';
// import 'foundation-sites/dist/js/foundation.min.js';
// import NotificationGenerator from './layouts/notifications/NotificationGenerator';

import './App.scss'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from './components/layout/Footer';

const taigaTheme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Nunito',
            'sans-serif',
        ]
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ffe0b2'
        },
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: '#64a435'
        }
    },
});

class App extends Component {
    render() {


        return (
            <MuiThemeProvider theme={taigaTheme}>
                <div className="App">
                    {this.props.children}
                    <div className="hands-bg"> </div>
                </div>
                <Footer />
            </MuiThemeProvider>
        );
    }
}

export default App
