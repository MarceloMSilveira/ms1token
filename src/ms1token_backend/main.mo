import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {
  
  let owner : Principal = Principal.fromText("hyahk-s5x3i-vpuhz-wvxeb-jo5t6-apalf-dbgno-ni6xw-54fil-jzuit-oae");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "DM$1"; //$ms1 coin descentralized

  private stable var balanceEntries: [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };

  //Debug.print("test");

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
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transfer(msg.caller,amount);
      return result;
    } else {
      return "Already Claimed";
    };
  };

  public shared(msg) func transfer(to:Principal, amount:Nat) : async (Text){
     let fromBalance = await balanceOf(msg.caller);
     if (fromBalance > amount){
       //subtract from 
       let newFromBalance : Nat = fromBalance - amount;
       balances.put(msg.caller, newFromBalance);
       //add to
       let toBalance = await balanceOf(to);
       let newToBalance = toBalance + amount;
       balances.put(to, newToBalance);

      return "success";
     } else {
       return "Insufficient Funds";
     }
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries()); // Save state before upgrade
  };

  system func postupgrade() {
    balances := HashMap.fromIter(balanceEntries.vals(), 1, Principal.equal, Principal.hash ); // restore balances hashmap after upgrade
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };
};