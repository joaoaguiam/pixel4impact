import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './Header.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

// import * as createCampaingActions from '../../store/create-campaign/actions';
// import * as createCampaingSelectors from '../../store/create-campaign/reducer';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    logo: {
        flex: 1,
        color: 'white',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appbar: {
        'background-color': '#f4cc70',
    }
};


class Header extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const { classes } = this.props;

        let url = window.location.pathname;
        console.log(url);
        // debugger;
        let isCreateCampaign = url.includes('create-campaign') || url === '/' ? 'active' : '';
        let isDemoCampaign = url.includes('0x776130470ca6ebbde5b26cdfeb7e0ef9578cdde3') || url === '/' ? 'active' : '';
        // let isCreateCampaign = url.includes('create-campaign') ? 'active' : '';
        return (

            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="title" className={classes.logo}>
                            <i className="fas fa-hand-holding-heart logo-icon"></i>Pixel<span className="logo-icon">4</span>Impact
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
            // <nav className="navbar navbar-expand-md navbar-dark">
            //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarSm">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>
            //     <div className="navbar-collapse collapse" id="collapsingNavbarSm">
            //         <ul className="nav navbar-nav">
            //             <li className={"nav-item "+isCreateCampaign}>
            //                 <a className="nav-link" href="/create-campaign">Create Campaign</a>
            //             </li>
            //             <li className={"nav-item "+isDemoCampaign}>
            //                 <a className="nav-link" href="/show-campaign/0x776130470ca6ebbde5b26cdfeb7e0ef9578cdde3">Demo Campaign</a>
            //             </li>
            //         </ul>
            //     </div>
            // </nav>
        )
    }
}


function mapStateToProps(state) {
    return {
        // newCampaign: createCampaingSelectors.getNewCampaign(state)
    };
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(Header));
