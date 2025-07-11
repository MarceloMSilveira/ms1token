import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";


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
  }
}