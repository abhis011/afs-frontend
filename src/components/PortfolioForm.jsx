import { useState } from 'react';
import axios from 'axios';

function PortfolioForm() {
  const [tickers, setTickers] = useState('');
  const [investment, setInvestment] = useState('');
  const [allocations, setAllocations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/analyze', {
      tickers: tickers.split(','),
      investment,
    });
    setAllocations(res.data.allocation);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">MPT Investment Advisor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 p-2 border"
          placeholder="Enter tickers (e.g. AAPL,MSFT)"
          value={tickers}
          onChange={(e) => setTickers(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border"
          placeholder="Total Investment ($)"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>

      {allocations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Suggested Allocation</h3>
          <ul>
            {allocations.map((a, i) => (
              <li key={i}>{a.ticker}: {a.weight}% → ${a.amount}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PortfolioForm;