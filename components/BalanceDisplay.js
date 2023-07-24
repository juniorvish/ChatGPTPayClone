import React from 'react';

function BalanceDisplay({ userBalance }) {
  return (
    <div id="balanceDisplay" className="balance-display">
      <h2>Your Balance</h2>
      <p>{userBalance} USDC</p>
    </div>
  );
}

export default BalanceDisplay;