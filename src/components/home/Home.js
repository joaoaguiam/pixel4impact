import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import autoBind from 'react-autobind';
import { Modal, Popover, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'

import './Home.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

// import * as createCampaingActions from '../../store/create-campaign/actions';
// import * as createCampaingSelectors from '../../store/create-campaign/reducer';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

class Home extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            show: true,
        }
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

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        $("#myModal").modal({ backdrop: "static" })

        this.setState({ show: true });
    }
    render() {

        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
        return (
            <div>
                <div className="text-center">
                    <h1>Pixel4Impact</h1>
                </div>
                <div className="card card-register mx-auto secti">
                    <span>bla bla bla</span>
                </div>
            </div>
        );
    }
    // return (
    // <div className="home-container">

    //     <div className="jumbotron text-center">
    //         <h1>Pixel 4 Impact</h1>
    //         <p>Get a pixel for a canvas impact!</p>
    //     </div>
    //     <div className="container-fluid">
    //         <h2>About Company Page</h2>
    //         <h4>Lorem ipsum..</h4>
    //         <p>Lorem ipsum..</p>
    //         <button className="btn btn-default btn-lg">Get in Touch</button>
    //     </div>

    //     <div className="container-fluid bg-grey">
    //         <h2>Our Values</h2>
    //         <h4><strong>MISSION:</strong> Our mission lorem ipsum..</h4>
    //         <p><strong>VISION:</strong> Our vision Lorem ipsum..</p>
    //     </div>
    // </div>
    //     )
    // }
}


function mapStateToProps(state) {
    return {
        // newCampaign: createCampaingSelectors.getNewCampaign(state)
    };
}

export default connect(mapStateToProps)(Home);
