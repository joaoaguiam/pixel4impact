var Pixel4Impact = artifacts.require("Pixel4Impact");

contract("Pixel4Impact", async function (accounts) {

    let toAscii = function (str) {
        return web3.toAscii(str).replace(/\u0000/g, '');
    }

    let getEvent = function (logs, eventName) {
        let size = logs.length;
        for (i = 0; i < size; i++) {
            if (logs[i].event == eventName) {
                return logs[i];
            }
        }
    }

    let countEvents = function (logs, eventName) {
        let size = logs.length;
        let count = 0;
        for (i = 0; i < size; i++) {
            if (logs[i].event == eventName) {
                count++;
            }
        }
        return count;
    }

    let isEVMException = function (err) {
        return err.toString().includes('revert');
    }

    describe('Pixel4Impact - Create Contract', () => {

        /*beforeEach(async function() {
          contract = await
        })*/
        it("should create a new contract and check initial values", async function () {
            let owner = accounts[0];

            let xPixels = 10;
            let yPixels = 10;
            let minDonation = 1000000;
            let metadataUri = "test.test";

            const contract = await Pixel4Impact.new(xPixels, yPixels, minDonation, metadataUri, { from: owner });

            let details = await contract.getDetails.call();

            let _xPixels = details[0];
            let _yPixels = details[1];
            let _minDonation = details[2];
            let _metadataUri = details[3];

            assert.equal(xPixels, _xPixels, "xPixels is not correct");
            assert.equal(yPixels, _yPixels, "yPixels is not correct");
            assert.equal(minDonation, _minDonation, "minDonation is not correct");
            assert.equal(metadataUri, _metadataUri, "metadataUri is not correct");
        });

    });

    // describe('TaigaEvent - New Tickets Type', () => {
    //     /*beforeEach(async function() {
    //       contract = await
    //     })*/
    //     it("should create a new ticket type and verify the tokens are created", async function () {
    //         let eventOwner = accounts[0];
    //         let eventName = "Taiga Event 1";
    //         let eventSymbol = "TE1";
    //         let eventMetadataUri = "http://my.store";

    //         let ticketTitle = "Ticket 1";
    //         let ticketPrice = 1050; //10.5 USD
    //         let ticketMetadataUri = "http://my.ticket1";
    //         let ticketSupply = 10;
    //         let ticketAcceptingOtherPaymentMethods = false;
    //         let ticketTransferFrom = 123456789;
    //         let ticketTransferUntil = 123456789;

    //         const contract = await TaigaEvent.new(eventName, eventSymbol, eventMetadataUri, { from: eventOwner });


    //         let tx = await contract.createTicketType(ticketTitle, ticketPrice, ticketMetadataUri, ticketSupply, ticketAcceptingOtherPaymentMethods, ticketTransferFrom, ticketTransferUntil, { from: eventOwner });

    //         let event = getEvent(tx.logs, "TicketTypeCreated");


    //         let logEventName = event.event;
    //         let ticketTitleLog = event.args.title;
    //         let ticketTypeIdLog = event.args.ticketTypeId;
    //         let supplyLog = event.args.supply;

    //         //   let fromTokenId = event.args.fromTokenId.toString();
    //         //   let toTokenId = event.args.fromTokenId.toString();

    //         assert.equal(logEventName, "TicketTypeCreated", "Logged Event should be TicketTypeCreated");
    //         assert.equal(ticketTypeIdLog, 0, "Ticket Type Id should be 0");
    //         assert.equal(ticketTitleLog, ticketTitle, "Ticket Title is not correct");
    //         assert.equal(supplyLog, ticketSupply, "Ticket Supply is not correct");

    //         let ticketType = await contract.getTicketTypeDetailsByTicketTypeId.call(ticketTypeIdLog, { from: eventOwner });

    //         let titleStored = ticketType[0];
    //         let priceStored = ticketType[1].toString();
    //         let supplyStored = ticketType[2].toString();
    //         let metadataUriStored = ticketType[3];
    //         let acceptingOtherPaymentMethodsStored = ticketType[4];
    //         let transferFromStored = ticketType[5];
    //         let transferUntilStored = ticketType[6];

    //         assert.equal(titleStored, ticketTitle, "Title not correct");
    //         assert.equal(priceStored, ticketPrice, "Price not correct");
    //         assert.equal(metadataUriStored, ticketMetadataUri, "Metadata Uri not correct");
    //         assert.equal(supplyStored, ticketSupply, "Ticket not correct");
    //         assert.equal(acceptingOtherPaymentMethodsStored, ticketAcceptingOtherPaymentMethods, "Accepting Other Payments not correct");
    //         assert.equal(transferFromStored, ticketTransferFrom, "Transferred From not correct");
    //         assert.equal(transferUntilStored, ticketTransferUntil, "Transfered Until not correct");

    //         let countTransferEvents = countEvents(tx.logs, "Transfer");
    //         assert.equal(countTransferEvents, ticketSupply, "Did not receive the correct amount of Transfer events");
    //         //let tokensOwned = await contract.tokensOf.call(owner);
    //         let balance = await contract.balanceOf.call(eventOwner);
    //         assert.equal(ticketSupply, balance, "Owner does not own the correct amount of tokens");

    //         for (i = 0; i < balance; i++) {
    //             let tokenId = await contract.tokenOfOwnerByIndex.call(eventOwner, i);
    //             let asset = await contract.getTicketTypeDetailsByTokenId.call(tokenId, { from: eventOwner });
    //             let titleStoredToken = asset[0];
    //             assert.equal(titleStoredToken, ticketTitle, "Title not correct");
    //         }
    //     });


        // it("should create a new asset type and transfer to another account", async function() {
        //   let storeName = "MyStore";
        //   let storeImageUri = "http://my.store";

        //   let title = "MyAssetType";
        //   let description = "Asset Description";
        //   let imageUri = "http://my.store/asset.png";
        //   let category = "gamming";
        //   let supply = 10;
        //   let properties = JSON.stringify({prop1 : 123, prop2 : "121"});


        //   const contract = await AssetStore.new(storeName, storeImageUri, {from: owner});

        //   await contract.createAsset(title, description, imageUri, category, supply, properties, {from: owner});

        //   await contract.transfer(firstPlayer, 0, {from:owner});

        //   let balance = await contract.balanceOf.call(owner);
        //   assert.equal(supply-1, balance, "Owner does not own the correct amount of tokens");

        //   let firstPlayerBalance = await contract.balanceOf.call(firstPlayer);
        //   assert.equal(1, firstPlayerBalance, "First Player does not own the correct amount of tokens");

        // });

        // it("should get the tokens owned by index", async function() {
        //   let storeName = "MyStore";
        //   let storeImageUri = "http://my.store";

        //   let title = "MyAssetType";
        //   let description = "Asset Description";
        //   let imageUri = "http://my.store/asset.png";
        //   let category = "gamming";
        //   let supply = 10;
        //   let properties = JSON.stringify({prop1 : 123, prop2 : "121"});


        //   let title1 = "MyAssetType1";
        //   let title2 = "MyAssetType2";


        //   const contract = await AssetStore.new(storeName, storeImageUri, {from: owner});

        //   await contract.createAsset(title, description, imageUri, assetType, supply, properties, {from: owner});
        //   await contract.createAsset(title1, description, imageUri, assetType, supply, properties, {from: owner});
        //   await contract.createAsset(title2, description, imageUri, assetType, supply, properties, {from: owner});

        //   let tokenId1 = 0;
        //   let tokenId2 = 10;
        //   let tokenId3 = 23;

        //   await contract.transfer(firstPlayer, tokenId1, {from:owner});
        //   await contract.transfer(firstPlayer, tokenId2, {from:owner});
        //   await contract.transfer(firstPlayer, tokenId3, {from:owner});

        //   let balance = await contract.balanceOf.call(firstPlayer);
        //   assert.equal(balance.toNumber(), 3, "Balance is not correct");

        //   let asset0 = await contract.getAssetTypeFromIndex.call(firstPlayer, 0);
        //   let asset1 = await contract.getAssetTypeFromIndex.call(firstPlayer, 1);
        //   let asset2 = await contract.getAssetTypeFromIndex.call(firstPlayer, 2);

        //   assert.equal(asset0[0].toNumber(), tokenId1, "TokenId first asset not correct");
        //   assert.equal(asset1[0].toNumber(), tokenId2, "TokenId second asset not correct");
        //   assert.equal(asset2[0].toNumber(), tokenId3, "TokenId third asset not correct");


        //   assert.equal(asset0[1], title, "Title first asset not correct");
        //   assert.equal(asset1[1], title1, "Title second asset not correct");
        //   assert.equal(asset2[1], title2, "Title third asset not correct");

        // });

        // it("should fail when creating the asset when not the owner", async function () {
        //     let storeName = "MyStore";
        //     let storeImageUri = "http://my.store";

        //     let title = "MyAssetType";
        //     let description = "Asset Description";
        //     let imageUri = "http://my.store/asset.png";
        //     let category = "gamming";
        //     let supply = 10;
        //     let properties = JSON.stringify({ prop1: 123, prop2: "121" });

        //     const contract = await AssetStore.new(storeName, storeImageUri, { from: owner });
        //     try {
        //         await contract.createAsset(title, description, imageUri, category, supply, properties, { from: firstPlayer });
        //         assert(false);
        //     }
        //     catch (err) {
        //         assert(isEVMException(err), err.toString());
        //     }
        // });

    // });
});
