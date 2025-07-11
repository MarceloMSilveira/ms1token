import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { ms1token_backend } from "../../../declarations/ms1token_backend";

function Transfer() {

  const [recipientId, setId] = useState('');
  const [amount, setAmount] = useState('');
  
  async function handleClick() {
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    await ms1token_backend.transfer(recipient, amountToTransfer);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
