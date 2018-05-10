import { web3 } from '../uport/uport-connectors'
import Promise from "bluebird";

import Pixel4ImpactArtifact from '../../../build/contracts/Pixel4Impact.json';

export const Pixel4Impact = function (address) {
    let abiStr = JSON.stringify(Pixel4ImpactArtifact.abi);
    let Pixel4ImpactABI = web3.eth.contract(JSON.parse(abiStr))
    let contract = Pixel4ImpactABI.at(address);
    return Promise.promisifyAll(contract);
}


export async function getPixel4ImpactDetails(address) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = Pixel4Impact(address);;
            let details = await contract.getDetailsAsync.call();
            console.log(details);
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


            result.pixels = new Array(result.xPixels);

            for (let iX = 0; iX < result.xPixels; iX++) {
                result.pixels[iX] = new Array(result.yPixels);
            }

            let numPixels = await contract.getNumPixelsTakenAsync.call();
            for (let i = 0; i < numPixels; i++) {
                let res = await contract.getPixelTakenByIndex.call();
                let x = parseInt(res[0].toNumber());
                let y = parseInt(res[1].toNumber());
                let color = res[2];
                result.pixels[x][y] = color;
            }

            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
