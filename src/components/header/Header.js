import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './Header.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

// import * as createCampaingActions from '../../store/create-campaign/actions';
// import * as createCampaingSelectors from '../../store/create-campaign/reducer';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

class Header extends Component {
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
        let url = window.location.href;

        let isCreateCampaign = url.includes('create-campaign') ? 'active' : '';
        // let isCreateCampaign = url.includes('create-campaign') ? 'active' : '';
        return (
            <nav className="navbar navbar-expand-md navbar-dark">
                <a className="navbar-brand" href="#"><i className="fas fa-hand-holding-heart logo-icon"></i>Pixel<span className="logo-icon">4</span>Impact</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarSm">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbarSm">
                    <ul className="nav navbar-nav">
                        <li className={"nav-item "+isCreateCampaign}>
                            <a className="nav-link" href="/create-campaign">Create Campaign</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">List all Campaigns</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


function mapStateToProps(state) {
    return {
        // newCampaign: createCampaingSelectors.getNewCampaign(state)
    };
}

export default connect(mapStateToProps)(Header);