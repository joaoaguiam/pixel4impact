import { web3 } from '../uport/uport-connectors'
import Promise from "bluebird";

import Pixel4ImpactArtifact from '../../../build/contracts/Pixel4Impact.json';

export const Pixel4Impact = function (address) {
    let abiStr = JSON.stringify(Pixel4ImpactArtifact.abi);
    let Pixel4ImpactABI = web3.eth.contract(JSON.parse(abiStr))

    return Promise.promisifyAll(Pixel4ImpactABI.at(address));
}


export async function getPixel4ImpactDetails(address) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = Pixel4Impact(address);
            let details = await contract.getDetailsAsync.call();
            let result = {
                xPixels: parseInt(details[0].toNumber()),
                yPixels: parseInt(details[1].toNumber()),
                minDonation: web3.fromWei(parseInt(details[2].toNumber()), 'ether'),
                metadataUri: details[3]
            }


            let response = await fetch(result.metadataUri);
            console.log(response);
            let metadata = await response.json();
            result.ngoName = metadata.ngoName;
            result.campaignName = metadata.campaignName;
            result.campaignWebsite = metadata.campaignWebsite;
            result.campaignLogo = metadata.campaignLogo;



            // metadataUri: '',
            //     ngoName: '',
            //     campaignName: '',
            //     campaignWebsite: '',
            //     campaignLogo: '',

            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}