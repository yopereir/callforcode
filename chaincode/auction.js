'use strict';

const { Contract } = require('fabric-contract-api');


class Auction extends Contract{

    constructor(){
        super();
    }
    // Creates auction given auction info and resourCenterID
    async initiateAuction(ctx, reliefCenterID,origin,destination){
      let bids =[]
      let auctionInfo={
          origin,
          destination,
          bids: bids
      }
      // Assigning AuctionID after reliefcenterID
      let auctionID = reliefCenterID
      await ctx.stub.putState(auctionID,auctionInfo);
    }
    
    // Gets abid criteria info
    async getAuctionInfo(ctx,auctionID){
        let {origin,destination} = await ctx.stub.getState(auctionID);
        return {origin,destination}
    }
    // Allows a transportation company to bid
    async bid(ctx, auctionID, costOfHire, driverName, truckNumber){
        let {origin,destination,bids} = await ctx.stub.getState(auctionID);
        let bid={}
        bid['CostOfHire']=costOfHire
        bid['DriverName']=driverName
        bid['TruckNumber']=truckNumber
        bids.push(bid)
        let auctionInfo = {origin,destination,bids}
        await ctx.stub.putState(auctionID, auctionInfo);
        console.info('Created bid');
    }
    //Gets the lowest bid
    async getLowestBid(ctx, auctionID){
        let {bids} = await ctx.stub.getState(auctionID);
        let lowestBid =bids[0]
        bids.forEach((bid)=>{if(bid['CostOfHire']>lowestBid['CostOfHire'])lowestBid=bid})
        return lowestBid
    }
    //Cloest auction after a specified time, selecting the lowest bid
    async closeAuction(ctx, reliefCenterID){
      let auctionID = reliefCenterID
      await ctx.stub.putState(auctionID,{});
    }

}

module.exports = Auction;