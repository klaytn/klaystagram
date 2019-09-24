pragma solidity ^0.5.6;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Klaystagram is ERC721, ERC721Enumerable {

    event PhotoUploaded (uint256 indexed tokenId, bytes photo, string title, string location, string description, uint256 timestamp);

    mapping (uint256 => PhotoData) private _photoList;

    struct PhotoData {
        uint256 tokenId;                       // Unique token id
        address[] ownerHistory;                // History of all previous owners
        bytes photo;                           // Image source encoded in uint 8 array format
        string title;                          // Title of photo
        string location;                       // Location where photo is taken
        string description;                    // Short description about the photo
        uint256 timestamp;                     // Uploaded time
    }

  /**
   * @notice _mint() is from ERC721.sol
   */
    function uploadPhoto(bytes memory photo, string memory title, string memory location, string memory description) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory ownerHistory;

        PhotoData memory newPhotoData = PhotoData({
            tokenId : tokenId,
            ownerHistory : ownerHistory,
            photo : photo,
            title: title,
            location : location,
            description : description,
            timestamp : now
        });

        _photoList[tokenId] = newPhotoData;
        _photoList[tokenId].ownerHistory.push(msg.sender);

        emit PhotoUploaded(tokenId, photo, title, location, description, now);
    }

  /**
   * @notice safeTransferFrom function checks whether receiver is able to handle ERC721 tokens
   *  and then it will call transferFrom function defined below
   */
    function transferOwnership(uint256 tokenId, address to) public returns(uint, address, address, address) {
        safeTransferFrom(msg.sender, to, tokenId);
        uint ownerHistoryLength = _photoList[tokenId].ownerHistory.length;
        return (
            _photoList[tokenId].tokenId,
            //original owner
            _photoList[tokenId].ownerHistory[0],
            //previous owner, length cannot be less than 2
            _photoList[tokenId].ownerHistory[ownerHistoryLength-2],
            //current owner
            _photoList[tokenId].ownerHistory[ownerHistoryLength-1]);
    }

  /**
   * @notice Recommand using transferOwnership, which uses safeTransferFrom function
   * @dev Overided transferFrom function to make sure that every time ownership transfers
   *  new owner address gets pushed into ownerHistory array
   */
    function transferFrom(address from, address to, uint256 tokenId) public {
        super.transferFrom(from, to, tokenId);
        _photoList[tokenId].ownerHistory.push(to);
    }

    function getTotalPhotoCount () public view returns (uint) {
        return totalSupply();
    }

    function getPhoto (uint tokenId) public view
    returns(uint256, address[] memory, bytes memory, string memory, string memory, string memory, uint256) {
        require(_photoList[tokenId].tokenId != 0, "Photo does not exist");
        return (
            _photoList[tokenId].tokenId,
            _photoList[tokenId].ownerHistory,
            _photoList[tokenId].photo,
            _photoList[tokenId].title,
            _photoList[tokenId].location,
            _photoList[tokenId].description,
            _photoList[tokenId].timestamp);
    }
}
