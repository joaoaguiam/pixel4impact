import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './ShowCampaign.scss';
import { getPixel4ImpactDetails } from '../../ethereum/contracts/Pixel4Impact';
import Header from '../header/Header';

// import { Line } from 'react-progressbar.js';

import * as showCampaignSelectors from '../../store/show-campaign/reducer';
import * as showCampaignActions from '../../store/show-campaign/actions';

// import CreateEventNextButton from './navigation/next-button/CreateEventNextButton';

// import CreateEventFieldName from './fields/name/CreateEventFieldName';
// import CreateEventFieldDates from './fields/dates/CreateEventFieldDates';
// import CreateEventPrevButton from './navigation/prev-button/CreateEventPrevButton';
// import CreateEventFieldLocation from './fields/location/CreateEventFieldLocation';
// // import CreateEventFieldLocation from './fields/location/autocomplete';
// import CreateEventFieldImages from './fields/images/CreateEventFieldImages';
// import CreateEventFieldDescription from './fields/description/CreateEventFieldDescription';
// import CreateEventFieldType from './fields/type/CreateEventFieldType';
// import CreateEventFieldOrganizer from './fields/organizer/CreateEventFieldOrganizer';
// import CreateEventConfirmation from './confirmation/CreateEventConfirmation';
// import CreateEventContractCreation from './contract-creation/CreateEventContractCreation';




// const progressBarOptions = {
//     strokeWidth: 0.5,
//     color: "#41348D",
//     // http://progressbarjs.readthedocs.io/en/latest/api/shape/ 
// }

// const STEPS = {
//     TYPE: 1,
//     NAME: 2,
//     DATES: 3,
//     LOCATION: 4,
//     IMAGES: 5,
//     DESCRIPTION: 6,
//     ORGANIZER: 7,
//     CONFIRMATION: 8,
//     CONTRACT_CREATION: 9,
// }

// const xPixels = 80;
// const yPixels = 30;
const pixelW = 10;
const pixelH = 10;
const emptyColor = '#f5f5f5';

class ShowCampaign extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.lastPixelX = -1;
        this.lastPixelY = -1;
        this.state = {
            campaign: {
                xPixels: 1,
                yPixels: 1,
                minDonation: 0.001,
                metadataUri: '',
                ngoName: '',
                campaignName: '',
                campaignWebsite: '',
                campaignLogo: '',
                pixelColors: this.generatePixels(1, 1),
            }
        }
    }

    generatePixels(xPixels, yPixels) {
        let pixelColors = [];

        for (var i = 0; i < xPixels; i++) {
            pixelColors[i] = [];

            for (var j = 0; j < yPixels; j++) {
                pixelColors[i][j] = 'rgb(' + Math.floor(Math.random() * 255) + ', ' +
                    Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';

                if (i % Math.floor(Math.random() * 3) === 0) {
                    pixelColors[i][j] = emptyColor;
                }
                if (j % Math.floor(Math.random() * 3) === 0) {
                    pixelColors[i][j] = emptyColor;
                }
            }
        }
        return pixelColors;
    }


    drawBaseCanvas(pixelColors, selectedX = -1, selectedY = -1) {

        var ctx = document.getElementById('pixels-canvas').getContext('2d');
        for (var iX = 0; iX < this.state.campaign.xPixels; iX++) {
            for (var iY = 0; iY < this.state.campaign.yPixels; iY++) {
                ctx.fillStyle = pixelColors[iX][iY];
                ctx.fillRect(iX * pixelW, iY * pixelH, pixelW, pixelH);
            }
        }

        if (selectedX !== -1 && selectedY !== -1) {
            if (this.state.campaign.pixelColors[selectedX][selectedY] === emptyColor) {
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(selectedX * pixelW, selectedY * pixelH, pixelW, pixelH);
            }
        }
    }

    renderCanvas() {
        this.drawBaseCanvas(this.state.campaign.pixelColors);
        let canvas = document.getElementById('pixels-canvas');

        let getMousePos = (canvas, evt) => {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        // let highlightPixel = (canvas, i, j) => {
        //     let context = canvas.getContext('2d');
        //     context.fillStyle = '#000';
        //     context.fillRect(j * 8, i * 8, 8, 8);
        // }
        let drawFunction = this.drawBaseCanvas;
        let pixelColors = this.pixelColors;

        let setLastPixel = (pixelX, pixelY) => {
            this.lastPixelX = pixelX;
            this.lastPixelY = pixelY;
        }
        canvas.addEventListener('mousemove', function (evt) {
            console.log(evt);
            var mousePos = getMousePos(canvas, evt);
            console.log(mousePos);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            console.log(message);
            let iX = Math.floor(mousePos.x / pixelW);
            let iY = Math.floor(mousePos.y / pixelH);
            console.log("iX:" + iX + ", iY:" + iY);
            //highlightPixel(canvas, i,j);
            setLastPixel(iX, iY);
            drawFunction(pixelColors, iX, iY);
        }, false);




    }
    componentDidMount = async () => {
        let pixel4ImpactAddress = this.props.routeParams.address;
        this.props.dispatch(showCampaignActions.fetchCampaing(pixel4ImpactAddress));
        // console.log(pixel4ImpactAddress);
        // let details = await getPixel4ImpactDetails(pixel4ImpactAddress);
        // details.pixelColors = this.generatePixels(details.xPixels, details.yPixels);
        // console.log(details);
        // this.setState({ campaign: details });
        // this.renderCanvas();
    }

    handleCanvasClick(e) {
        console.log(e);
    }
    render() {
        console.log(this.props);
        let canvasW = this.state.campaign.xPixels * pixelW;
        let canvasH = this.state.campaign.yPixels * pixelH;
        return (
            <div>
                <Header />

                <div className="show-campaign-page">

                    <div className="campaign-container">

                        <div className="row">
                            <div className="logo-container ">
                                <img src={this.state.campaign.campaignLogo} alt={this.state.campaign.campaignName} />
                                {/* https://alchetron.com/cdn/gastagus-21950eda-85e7-432e-9fd1-7b3527f8c73-resize-750.png" */}
                            </div>
                            <div className="">

                                <h1>{this.state.campaign.ngoName}</h1>

                                <h2>{this.state.campaign.campaignName}</h2>
                            </div>
                        </div>
                        <div className="canvas-container">
                            <canvas id="pixels-canvas" width={canvasW} height={canvasH} onClick={this.handleCanvasClick}></canvas>
                        </div>
                        <div className="row btns-container">
                            <input className="btn btn-outline-primary contributions" type="button" value="Contributions" />
                            <input className="btn btn-success donate" type="button" value="Buy a Pixel4Impact" />
                        </div>
                    </div>
                    {/* <div className="container col-sm-4 main-container">
                    <div className="row">
                        <div className="logo-container">
                            <img src="https://mycncjobs.com/public/uploads/employer/JOBPORTAL-1513181546.png" />
                        </div>
                        <span className="ngo-name">Non Governmental Organization</span>
                        <span className="ngo-campaign">Fund-raising Campaign</span>
                    </div>
                    <div className="row">
                        <div className="pixels-container">
                            <canvas id="pixels-canvas" width="320" height="320"></canvas>
                        </div>
                    </div>
                    <div className="row pull-right">
                        <input className="btn btn-outline-primary" type="button" value="Hall of fame" />
                        <input className="btn btn-success" type="button" value="Donate" />
                    </div>
                </div> */}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // currentStep: createEventSelectors.getCurrentStep(state)
    };
}

export default connect(mapStateToProps)(ShowCampaign);
