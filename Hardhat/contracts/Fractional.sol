// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title NFT Share Token
/// @notice ERC20 token contract representing a share of an ERC721
contract NFTShare is ERC20, Ownable  {
	/// @notice Deploys an NFTShare with the specified name and symbol, and mints an initial supply to the specified address
	/// @param name The name of the deployed token
	/// @param symbol The symbol of the deployed token
	/// @dev Deployed from the split() function of the LilFractional contract
	constructor(
		string memory name,
		string memory symbol
	)  ERC20(name, symbol) {}

	function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
	/// @notice Burns a specified amount of tokens from a specified user after ensuring the caller has permission to
	/// @param from The address of the user who should get their tokens burned
	/// @param amount The amount of tokens that should get burned
	/// @dev The allowance check happens when substracting the amount from the allowed amount. This operation will underflow (and revert) if the caller doesn't have enough allowance.
	function burnFrom(address from, uint256 amount) public {
		uint256 allowed = allowance(from,msg.sender); // Saves gas for limited approvals.

		if (allowed != type(uint256).max) approve(from,allowed - amount) ;

		_burn(from, amount);
	}
}

/// @title Lil fractional
/// @notice NFT fractionalisation factory.
contract LilFractional is Ownable {

    uint public constant DELAY_TIME = 30 seconds; // Время по дефолту устанавливаемое магазином для лока 
    uint public reservedToken; 
	
    /// ERRORS ///

	/// @notice Thrown when trying to rejoin a token from a vault that doesn't exist
	error VaultNotFound();

	/// @dev Parameters for vaults
	/// @param nftContract The ERC721 contract for the fractionalized token
	/// @param owner Owner of the splitted contract
	/// @param tokenId The ID of the fractionalized token
	/// @param tokenSupply The amount of issued ERC20 tokens for this vault
	/// @param maxTokenSupply Total supple of issued ERC20 tokens for this vault
	/// @param minReservedToken Amount of tokens need to buy to mint 
	/// @param tokenContract The ERC20 contract for the issued tokens
	/// @param mintTime Time of split the ERC721 token (timestamp)

	struct Vault {
		ERC721 nftContract;
		address owner;
		uint price;
		uint tokenId;
		uint tokenSupply;
		uint maxTokenSupply;
        uint minReservedToken;
		NFTShare tokenContract;
        uint mintTime;
        uint dayCount;
		uint tokenAmountByOwner;
	}

	struct TokenOwner {
		address owner;
		uint amount;
	}

	/// EVENTS ///

	/// @notice Emitted when a token is fractionalized
	/// @param vault The details of the created vault
	event VaultCreated(Vault vault);

	/// @notice Emitted when a token is recovered from a vault
	/// @param vault The details of the destroyed vault
	event VaultDestroyed(Vault vault);

	/// @notice Emitted when someone ordered token from a vault
    event OrderedTokens(address buyer, uint vaultId, uint amount);
	
	/// @notice Emitted when someone claimed tokens from a vault
		event tokenClaimed(address claimer, uint vaultId);

	/// @notice Emitted when user refund money from a vault
		event refundMoney(address buyer, uint vaultId, uint amount);

	/// @notice Used as a counter for the next vault index.
	/// @dev Initialised at 1 because it makes the first transaction slightly cheaper.
	uint256 public vaultId = 1;

	/// @notice An indexed list of vaults
	/// @dev This automatically generates a getter for us!
	mapping(uint256 => Vault) public getVault; // 
    mapping(address => uint) public payedTokens; // amount of tokens that buyer reserved
    mapping(address => uint) public recievedMoney; // amount of money that buyer reserved by voult
    mapping(uint => uint) public vaultToOwner; // amount of money on a voult's owner contract 
	mapping(uint => TokenOwner) public vaultToAddress; // amount of voult's tokens by address
	

	/// @notice Fractionalize an ERC721 token
	/// @param nftContract The ERC721 contract for the token you're fractionalizing
	/// @param tokenId The ID of the token you're fractionalizing
	/// @param name The name for the resultant ERC20 token
	/// @param symbol The symbol for the resultant ERC20 token
	/// @dev Remember to call setApprovalForAll(<address of this contract>, true) on the ERC721's contract before calling this function
	function split(
		ERC721 nftContract,
		uint _maxTokenSupply,
        uint256 _minReservedToken,
		uint256 price,
		uint256 tokenId,
		string memory name,
		string memory symbol,
        uint _dayCount
	) public {
		NFTShare tokenContract = new NFTShare(name, symbol); // создает ERC20

		Vault memory vault = Vault({ // записывает данные по nft адрес, id, количество erc20, контракт erc20
			nftContract: nftContract,
			maxTokenSupply: _maxTokenSupply,
            minReservedToken: _minReservedToken,
			owner: msg.sender,
			price: price,
			tokenId: tokenId,
			tokenSupply: 0,
			tokenContract: tokenContract,
            mintTime: block.timestamp,
            dayCount: _dayCount,
			tokenAmountByOwner: 0
            
		});
		getVault[vaultId] = vault;
		nftContract.transferFrom(msg.sender, address(this), tokenId); // отправляет nft на этот адрес 
		vaultId++;
		emit VaultCreated(vault);
	}

	/// @notice ERC20 token reservation function
	/// @param _vaultId - id ERC721 токена
	/// @param _amount - количество ERC20 токенов для минта 
	function order(uint256 _vaultId, uint256 _amount) public payable {
		Vault memory vault = getVault[_vaultId];
		require(vault.tokenSupply + _amount <= vault.maxTokenSupply,"You can't mint too much tokens");
		uint256 totalPrice =  _amount * vault.price;
        recievedMoney[msg.sender] += totalPrice;
		require(msg.value == totalPrice, "not enough money");
		vault.tokenSupply += _amount;
		vault.tokenAmountByOwner[_vaultId][msg.sender] += _amount;
        payedTokens[msg.sender] += _amount;
        reservedToken += _amount;
        vaultToOwner[_vaultId] += totalPrice;
        getVault[_vaultId] = vault;

        emit OrderedTokens(msg.sender, _vaultId, _amount);
	}

    /// @notice Claim ERC20 token or refund money back to the buyer
	/// @param _vaultId The ID of the vault containing the token
    function claimOrRefund(uint _vaultId) external {
		Vault memory vault = getVault[_vaultId];
        uint lockTime = vault.mintTime + (vault.dayCount * DELAY_TIME);
        require(payedTokens[msg.sender] != 0, "You didn't pay");
        require(vault.tokenSupply >= vault.minReservedToken || block.timestamp > lockTime, "It's not a time");
        if(vault.tokenSupply >= vault.minReservedToken) { 
            uint orderedTokens = payedTokens[msg.sender];
            payedTokens[msg.sender] = 0;
            vault.tokenContract.mint(msg.sender, orderedTokens);

			emit tokenClaimed(msg.sender, _vaultId);
        } else if (block.timestamp > lockTime) {
            payable(msg.sender).transfer(recievedMoney[msg.sender]);
            uint amount = payedTokens[msg.sender];
            payedTokens[msg.sender] = 0;
            vault.tokenSupply -= amount;
            getVault[_vaultId] = vault;

			emit refundMoney(msg.sender, _vaultId, amount);

        }
    }

	/// @notice Recover a fractionalized ERC721 token
	/// @param _vaultId The ID of the vault containing the token
	/// @dev Remember to call approve(<address of this contract>, <supply or greater>) on the ERC20's contract before calling this function
	function join(uint256 _vaultId) public payable {
		Vault memory vault = getVault[_vaultId];
		require(vault.tokenContract.balanceOf(msg.sender) == vault.maxTokenSupply, "You don't have enough tokens");
		if (address(vault.tokenContract) == address(0)) revert VaultNotFound();
		delete getVault[_vaultId];
	
		vault.tokenContract.burnFrom(msg.sender, vault.maxTokenSupply);
		vault.nftContract.transferFrom(address(this), msg.sender, vault.tokenId);
	}

	/// @dev This function ensures this contract can receive ERC721 tokens
	function onERC721Received(
		address,
		address,
		uint256,
		bytes memory
	) public payable returns (bytes4) {
		return this.onERC721Received.selector;
	}

    /// @notice Withdrow money from contract 
	/// @param _vaultId The ID of the vault containing the token
    function withdrawMoney(uint _vaultId) external {
		Vault memory vault = getVault[_vaultId];
        require(msg.sender == vault.owner, "you are not an owner");
        uint refund = vaultToOwner[_vaultId];
        vaultToOwner[_vaultId] = 0;
        payable(msg.sender).transfer(refund);
    }
}