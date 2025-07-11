import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { ms1token_backend } from "../../../declarations/ms1token_backend";

function Balance() {
  
  const [inputValue, setInput] = useState('');
  const [balanceResult, setBalanceResult] = useState('');

  async function handleClick() {
    //console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await ms1token_backend.balanceOf(principal);
    console.log(balance.toLocaleString());
    setBalanceResult(balance.toLocaleString());
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
      <p>This account has a balance of ${balanceResult}.</p>
    </div>
  );
}

export default Balance;
