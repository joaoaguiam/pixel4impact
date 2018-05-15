import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';


export const DONATION_STATUS = {
    DRAFT: 0,
    CONFIRMED: 1,
    WAITING_MINING: 2,
    MINED: 3
}

const initialState = Immutable({
    campaign: {
        ngoName: '',
        campaignName: '',
        campaignWebsite: '',
        campaignLogo: '',
        xPixels: 0,
        yPixels: 0,
        minDonation: 0,
        metadataUri: '',
    },
    isFetched: false,
    status: DONATION_STATUS.DRAFT,
    txHash: undefined,
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

export function getStatus(state) {
    return state.showCampaign.status;
}
export function getTxHash(state) {
    return state.showCampaign.txHash;
}

