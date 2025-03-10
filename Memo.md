3/7 #tailwindCSSが反映されない

remixで以下のコードをデプロイ、コントラクトアドレスをpage.tsxに書く。remixのmintのplayerにはソーシャルログインで作成されたスマートアカウントアドレスを書く。


```solidity
// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameItem is ERC721URIStorage {
    uint256 private _nextTokenId;

    mapping(uint tokenId => uint numberOfwins) public wins;

    constructor() ERC721("Beracuda", "ITM") {}

    function mint(address player) 
        public 
        returns (uint256) 
    {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);
        return tokenId;
    }

    function battle(uint tokenId) external {
        require(ownerOf(tokenId) == msg.sender);
        wins[tokenId] ++;
    }
}
```

