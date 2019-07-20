/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Auction = require('./chaincode/auction');
const Resource = require('./chaincode/resource');

module.exports.contracts = [ Auction, Resource ];
