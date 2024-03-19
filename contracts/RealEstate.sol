//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstate is ERC721URIStorage {
  // Use the Counters library to facilitate the auto-incrementing of token IDs.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  /**
   * @dev Constructor
     * @notice The constructor inherits from ERC721 and passes the name and symbol of the token to the ERC721 constructor
     */
  constructor() ERC721("RealEstate", "RE") {}

  /*
   * @dev Mint a new token
     * @param _to The address that will own the minted token
     * @param _tokenURI The tokenURI of the minted token
     * @return The new token's ID
     * @notice This function mints a new token and sets the tokenURI
     */

  function mint(string memory _tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
    return newTokenId;
  }

  /*
   * @dev Transfer a token
     * @param _from The address that owns the token
     * @param _to The address that will own the token
     * @param _tokenId The token ID
     * @notice This function transfers a token from one address to another
     */
  function totalSupply() public view returns (uint256) {
    return _tokenIds.current();
  }
}
