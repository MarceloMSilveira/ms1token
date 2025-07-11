import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { ms1token_backend } from "../../../declarations/ms1token_backend";

function Balance() {
  
  const [inputValue, setInput] = useState('');
  const [balanceResult, setBalanceResult] = useState('');
  const [symbol, setSymbol] = useState('');
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    //console.log(inputValue);
    let balance;
    try {
      const principal = Principal.fromText(inputValue);
      balance = await ms1token_backend.balanceOf(principal);  
      console.log(balance.toLocaleString());
      setBalanceResult(balance.toLocaleString());
      setSymbol(await ms1token_backend.getSymbol());
      setHidden(false);
    } catch (error) {
      balance = 0;
      setHidden(true);
    }
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=> setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {symbol}.</p>
    </div>
  );
}

export default Balance;
