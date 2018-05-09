pragma solidity ^0.4.21;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract Pixel4Impact is ERC721Token, Ownable {

    uint16 public xPixels;
    uint16 public yPixels;
    uint public minDonation;
    string public metadataUri;

    function Pixel4Impact(uint16 _xPixels, uint16 _yPixels, uint _minDonation, string _metadataUri) ERC721Token("Pixel4Impact", "P4I") public { 
        xPixels = _xPixels;
        yPixels = _yPixels;
        minDonation = _minDonation;
        metadataUri = _metadataUri;
    }

    struct Pixel {
        uint16 x;
        uint16 y;
        string color;
    }
    
    mapping(uint256 => Pixel) public tokenToPixel;
    mapping(uint16 => mapping(uint16 => bool)) pixelsTaken;
    
    event PixelCreated(uint16 x, uint16 y, string color, uint donation, address contributor);

    modifier tokenAvailable(uint16 x, uint16 y) {
        require(!pixelsTaken[x][y]);
        require(x < xPixels);
        require(y < yPixels);
        _;
    }

    modifier isMinDonation() {
        require(msg.value >= minDonation);
        _;
    }


    function donatePixel(uint16 _x, uint16 _y, string _color) public payable tokenAvailable(_x, _y) isMinDonation() {
        uint256 newTokenId = _getNextTokenId();
        _mint(msg.sender, newTokenId);
        Pixel memory pixel = Pixel({
            x: _x,
            y: _y,
            color: _color
        });
        tokenToPixel[newTokenId] = pixel;
        pixelsTaken[_x][_y] = true;

        owner.transfer(msg.value);
    }

    function _getNextTokenId() private view returns (uint256) {
        return totalSupply().add(1); 
    }

    function getDetails() public view returns(uint _xPixels, uint _yPixels, uint _minDonation, string _metadataUri) {
        return (uint(xPixels), uint(yPixels), minDonation, metadataUri);
    }

    

    function () external payable {
        //TODO;
    }
}