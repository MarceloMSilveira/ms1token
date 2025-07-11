import React, { useState } from "react";
import { ms1token_backend } from "../../../declarations/ms1token_backend";

function Faucet() {

  const [isDisable, setDisable] = useState(false);
  const [buttomText, setButtom] = useState('Gime gime')

  async function handleClick(event) {
    setDisable(true);
    setButtom(await ms1token_backend.payOut());
    setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button 
          id="btn-payout" 
          onClick={handleClick}
          disabled={isDisable}
          >
          {buttomText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
