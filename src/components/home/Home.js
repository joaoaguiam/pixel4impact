import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './Home.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

// import * as createCampaingActions from '../../store/create-campaign/actions';
// import * as createCampaingSelectors from '../../store/create-campaign/reducer';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

class Home extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    // handleFieldChange(e, fieldName) {
    //     let value = e.target.value;
    //     this.props.dispatch(createCampaingActions.updateNewCampaignField(fieldName, value));
    // }

    // handleLogoUploaded(url, hash) {
    //     this.props.dispatch(createCampaingActions.updateNewCampaignField('campaignLogo', url));

    // }
    // handleCreateCampaignClick() {
    //     this.props.dispatch(createCampaingActions.createCampaignOnBlockchain());
    // }


    render() {
        return (
            <div className="home-container">
                {/* <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#about">ABOUT</a></li>
                                <li><a href="#services">SERVICES</a></li>
                                <li><a href="#portfolio">PORTFOLIO</a></li>
                                <li><a href="#pricing">PRICING</a></li>
                                <li><a href="#contact">CONTACT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav> */}
                <div className="jumbotron text-center">
                    <h1>Pixel 4 Impact</h1>
                    <p>Get a pixel for a canvas impact!</p>
                </div>
                <div className="container-fluid">
                    <h2>About Company Page</h2>
                    <h4>Lorem ipsum..</h4>
                    <p>Lorem ipsum..</p>
                    <button className="btn btn-default btn-lg">Get in Touch</button>
                </div>

                <div className="container-fluid bg-grey">
                    <h2>Our Values</h2>
                    <h4><strong>MISSION:</strong> Our mission lorem ipsum..</h4>
                    <p><strong>VISION:</strong> Our vision Lorem ipsum..</p>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // newCampaign: createCampaingSelectors.getNewCampaign(state)
    };
}

export default connect(mapStateToProps)(Home);
