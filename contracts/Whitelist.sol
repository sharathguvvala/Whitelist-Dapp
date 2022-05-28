//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Whitelist {
    uint8 public maxWhitelistAddresses;

    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhitelistAddresses){
        maxWhitelistAddresses = _maxWhitelistAddresses;
    }

    modifier  checksToAddInToWhitelist {
        require(whitelistedAddresses[msg.sender],"Sender already in whitelist");
        require(numAddressesWhitelisted<maxWhitelistAddresses,"Max limit reached");
        _;
    }

    function addAddressToWhitelist() public checksToAddInToWhitelist{
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted++;
    }
}