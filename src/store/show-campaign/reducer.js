import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    campaign: {
        ngoName: '',
        campaignName: '',
        campaignWebsite: '',
        campaignLogo: '',
        xPixels: 0,
        yPixels: 0,
        minimunDonation: 0,
        metadataUri: '',
    },
    isFetched: false
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CAMPAIGN_FETCHED:
            return state.merge({
                campaign: action.campaign,
                isFetched: true,
            });
        default:
            return state;
    }
}

// selectors

export function getCampaign(state) {
    return state.showCampaign.campaign;
}

export function isFetched(state) {
    return state.showCampaign.isFetched;
}