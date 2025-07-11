import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";


actor Token {
  
  var owner : Principal = Principal.fromText("hyahk-s5x3i-vpuhz-wvxeb-jo5t6-apalf-dbgno-ni6xw-54fil-jzuit-oae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "DM$1"; //$ms1 coin descentralized

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  balances.put(owner, totalSupply);

  public query func balanceOf (who : Principal) : async Nat {
    let balance : Nat = switch(balances.get(who)) {
      case(null) { 0 };
      case(?result) { result };
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    //Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      balances.put(msg.caller,amount);
      return "Success";
    } else {
      return "Already Claimed!";
    };
    
  };
}