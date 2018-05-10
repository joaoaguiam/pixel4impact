import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './ShowCampaign.scss';

import Header from '../header/Header';

// import { Line } from 'react-progressbar.js';

import * as showCampaignSelectors from '../../store/show-campaign/reducer';
import * as showCampaignActions from '../../store/show-campaign/actions';

import { SliderPicker } from 'react-color';


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

const emptyColor = '#f5f5f5';

class ShowCampaign extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.lastPixelX = -1;
        this.lastPixelY = -1;
        this.pixelW = 10;
        this.pixelH = 10;
        this.state = {
            mouseColor: '#f4511e',
            selectMode: false
        }
    }

    // generatePixels(xPixels, yPixels) {
    //     let pixelColors = [];

    //     for (var i = 0; i < xPixels; i++) {
    //         pixelColors[i] = [];

    //         for (var j = 0; j < yPixels; j++) {
    //             pixelColors[i][j] = 'rgb(' + Math.floor(Math.random() * 255) + ', ' +
    //                 Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';

    //             if (i % Math.floor(Math.random() * 3) === 0) {
    //                 pixelColors[i][j] = emptyColor;
    //             }
    //             if (j % Math.floor(Math.random() * 3) === 0) {
    //                 pixelColors[i][j] = emptyColor;
    //             }
    //         }
    //     }
    //     return pixelColors;
    // }


    drawBaseCanvas(selectedX = -1, selectedY = -1) {

        var ctx = document.getElementById('pixels-canvas').getContext('2d');
        for (var iX = 0; iX < this.props.campaign.xPixels; iX++) {
            for (var iY = 0; iY < this.props.campaign.yPixels; iY++) {
                let color = this.props.campaign.pixels[iX][iY];
                if (color === undefined) {
                    color = emptyColor;
                }
                ctx.fillStyle = color;
                ctx.fillRect(iX * this.pixelW, iY * this.pixelH, this.pixelW, this.pixelH);
            }
        }

        if (this.state.selectMode && selectedX !== -1 && selectedY !== -1) {
            if (this.props.campaign.pixels[selectedX][selectedY] === undefined) {
                ctx.fillStyle = this.state.mouseColor;
                ctx.fillRect(selectedX * this.pixelW, selectedY * this.pixelH, this.pixelW, this.pixelH);
            }
        }
    }
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    handleMouseMove(evt) {
        let canvas = document.getElementById('pixels-canvas');
        var mousePos = this.getMousePos(canvas, evt);
        let iX = Math.floor(mousePos.x / this.pixelW);
        let iY = Math.floor(mousePos.y / this.pixelH);
        this.lastPixelX = iX;
        this.lastPixelY = iY;
        // setLastPixel(iX, iY);
        this.drawBaseCanvas(iX, iY);
    }
    renderCanvas() {
        this.drawBaseCanvas();
        let canvas = document.getElementById('pixels-canvas');



        let drawFunction = this.drawBaseCanvas;

        let setLastPixel = (pixelX, pixelY) => {
            this.lastPixelX = pixelX;
            this.lastPixelY = pixelY;
        }
        let pixelW = this.pixelW;
        let pixelH = this.pixelH;
        canvas.addEventListener('mousemove', this.handleMouseMove, false);
    }

    componentDidUpdate() {
        this.renderCanvas();
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
        alert("Will initiate the donation of Pixel "+this.lastPixelX+ " x "+this.lastPixelY);
    }
    handleColorChange(color) {
        console.log(color.hex);
        this.setState({ mouseColor: color.hex });
    }

    handleDonatePixelClick(e) {
        this.setState({ selectMode: true });
    }

    render() {
        console.log(this.props);

        if (this.props.isFetched) {
            let canvasW = this.props.campaign.xPixels * this.pixelW;
            let canvasH = this.props.campaign.yPixels * this.pixelH;
            let canvasClass = this.state.selectMode ? 'select-mode': '';

            return (
                <div>
                    <Header />
                    <div className="container show-campaign-page">
                        <div className="card card-register mx-auto col-sm-8">
                            {/* <div className="card-header">Create Pixel 4 Impact campaign</div> */}
                            <div className="card-body">



                                <div className="row">
                                    <div className="logo-container ">
                                        <img src={this.props.campaign.campaignLogo} alt={this.props.campaign.campaignName} />
                                        {/* https://alchetron.com/cdn/gastagus-21950eda-85e7-432e-9fd1-7b3527f8c73-resize-750.png" */}
                                    </div>
                                    <div className="">

                                        <h1>{this.props.campaign.ngoName}</h1>

                                        <h2>{this.props.campaign.campaignName}</h2>
                                    </div>
                                </div>
                                <div className="canvas-container text-center">
                                    <canvas id="pixels-canvas" className={canvasClass} width={canvasW} height={canvasH} onClick={this.handleCanvasClick}></canvas>
                                </div>
                                {this.state.selectMode &&
                                    <div>
                                        <SliderPicker
                                            color={this.state.mouseColor}
                                            onChangeComplete={this.handleColorChange}
                                        />
                                    </div>
                                }
                                <div className="row btns-container">
                                    <input className="btn btn-outline-primary contributions" type="button" value="Donators" />
                                    {!this.state.selectMode && <input className="btn btn-primary donate" type="button" value="Donate a Pixel4Impact" onClick={this.handleDonatePixelClick} />}
                                    {this.state.selectMode && <span className="donate">Select a Color and click on the Pixel to donate</span>}
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
                </div>
            )
        }
        else {
            return (
                <div>
                    <Header />

                    <div className="show-campaign-page text-center">

                        Loading...
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        isFetched: showCampaignSelectors.isFetched(state),
        campaign: showCampaignSelectors.getCampaign(state),
    };
}

export default connect(mapStateToProps)(ShowCampaign);
