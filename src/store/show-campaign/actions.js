import _ from 'lodash';

import * as types from './actionTypes';
import * as showCampaingSelectors from './reducer';
import { getPixel4ImpactDetails } from '../../ethereum/contracts/Pixel4Impact';
// import { getPixel4ImpactDetails } from '../../ethereum/contracts/Pixel4Impact';
// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createPixel4Impact } from '../../ethereum/contracts/Pixel4ImpactFactory';

export function fetchCampaing(address) {
    return async (dispatch, getState) => {
        try {

            let campaign = await getPixel4ImpactDetails(address);
            console.log(campaign);
            
            dispatch({ type: types.CAMPAIGN_FETCHED, campaign});
        } catch (error) {
            console.error(error);
        }
    };
}
