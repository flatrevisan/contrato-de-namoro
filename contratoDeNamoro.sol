//SPDX-License-Identifier: CC-BY-4.0
pragma solidity 0.6.10;

contract ContratoDeNamoro
{
    struct Lovers 
    {
        string name;
        address payable party;
        bool signed;
        bool exist;
        uint256 dateSigned;
    }
    
    address payable public lawyer;
    uint256 public loversInvolved;
    uint256 public fees;
    uint256 public consent2;
    uint256 public consent1;
    
    Lovers [] hooked;
    
    event consentDeclarationIssued (address,string);
    event statusCommitment (address, statuses);
    event changeStatusFailed (address,string);
    event feesReceived (address, uint256, string);
    
    enum statuses {Single, Dating}
    statuses currentStatus;
    
    constructor () public
    
    {
        lawyer = 0x888cDa7b74D2364FfBA6c27FeFF2237501B85DF6;
        fees = 500;
        currentStatus = statuses.Single;
    }
    
    modifier minimumLovers ()
    {  
        require (loversInvolved >= 1, "Not enough Parties to the Contract");
        _;
    }
    
    modifier costs ()
    {
        require (fees>= 500);
        _;
    }
    
    function identifyLovers (uint256 _loversInvolved, string memory _name, address payable _party) public  
    {
        require(msg.sender == lawyer, "Only the Lawyer can provide the party's information.");
        Lovers memory storeLovers = Lovers (_name, _party, false, true, 0);
        hooked.push(storeLovers);
        loversInvolved = _loversInvolved;
    }
    
    function commitment (uint _loverId, uint256 _consent1, uint256 _consent2) payable public costs
    {
        Lovers storage lover = hooked[_loverId];
        require (lover.exist, "Invalid Lover Id.");
        require (!lover.signed, "You cannot sign twice.");
        
        if (_consent1 == 1) 
        {
            consent1 = consent1 + 1;
            emit consentDeclarationIssued(msg.sender, "You just accepted the commitment to date!");
        }
        
        if (_consent2 == 1) 
        {
            consent2 = consent2 + 1;
            emit consentDeclarationIssued(msg.sender, "You just accepted a separate property marital property system.");
        }
        lover.signed=true;
        lover.dateSigned=now;
        
        if (consent1 == loversInvolved || consent2 == loversInvolved)
        {
            currentStatus = statuses.Dating;
            emit statusCommitment (msg.sender, currentStatus);
        } else { 
            emit changeStatusFailed (msg.sender, "No change of relationship status verified due to lack of consent."); 
        }
    }       
    
    function payFee () external payable
    {
        lawyer.transfer (address(this).balance);
        emit feesReceived (msg.sender, msg.value, "Legal Fees received. Thank You!");
    }    
    
}
