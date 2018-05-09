import _ from 'lodash';

import * as types from './actionTypes';
import * as showCampaingSelectors from './reducer';
import { getPixel4ImpactDetails } from '../../ethereum/contracts/Pixel4Impact';
// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createPixel4Impact } from '../../ethereum/contracts/Pixel4ImpactFactory';

export function fetchCampaing(address) {
    return async (dispatch, getState) => {
        try {

            let campaign = await getPixel4ImpactDetails();
            console.log(campaign);
            // let newCampaign = _.clone(createCampaingSelectors.getNewCampaign(getState()));
            // newCampaign[fieldName] = fieldValue;
            // dispatch({ type: types.NEW_CAMPAIGN_FIELD_UPDATED, newCampaign, fieldName, fieldValue });
        } catch (error) {
            console.error(error);
        }
    };
}

// export function createCampaignOnBlockchain() {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(updateStatus(createCampaingSelectors.CAMPAIGN_STATUS.CONFIRMED));
//             let campaign = _.clone(createCampaingSelectors.getNewCampaign(getState()));

//             uploadObjectIpfs(campaign)
//                 .then(async (result) => {
//                     let url = result.url;
//                     campaign.metadataUri = url;
//                     dispatch(updateNewCampaignField('metadataUri', url));
//                     createPixel4Impact(campaign, dispatch);
//                 })
//                 .catch((err) => {
//                     debugger;
//                 });
            
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

// export function updateStatus(newStatus) {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({ type: types.STATUS_UPDATED, newStatus});
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

// export function updateContractDetails(contractDetails) {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({ type: types.CONTRACT_DETAILS_UPDATED, contractDetails});
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }


