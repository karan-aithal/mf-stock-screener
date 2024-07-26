import React, { useState } from 'react';
// import { fetchRollingReturn } from '../api/service';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const RollingReturnCalculator: React.FC = () => {
  const [fundCode, setFundCode] = useState<string>('');
  const [result, setResult] = useState<string>('');
  //const [error, setError] = useState<string | null>(null);

  // const handleCalculate = async () => {
  //   try {
  //     const data = await fetchRollingReturn(fundCode);
  //     setResult(data.average_annual_return);     // returns average annual return from KITE Zerodha
  //     setError(null);
  //   } catch (err) {
  //     setError('Error fetching data. Please try again.');
  //     setResult(null);
  //   }
  // };

 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post( `${API_URL}/calculate`, { fund_code: fundCode }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); console.log(response.data); // Log the response data to check its structure
      if (response.data && response.data.avg_rolling_return !== undefined && response.data.fund_name !== undefined) {
        setResult(`Fund Name: ${response.data.fund_name}\n3-Year Avg Annual Rolling Return: ${response.data.avg_rolling_return.toFixed(2)}%`);
      } else if (response.data && response.data.error) {
        setResult(`Error: ${response.data.error}`);
      } else {
        setResult('Error: Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching the data', error);
      setResult('Error fetching the data');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">3-Year Avg Annual Rolling Return Calculator</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="fund_code">Mutual Fund Code (e.g., RELIANCE.NS):</label>
          <input
            type="text"
            className="form-control"
            id="fund_code"
            value={fundCode}
            onChange={(e) => setFundCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculate</button>
      </form>
      <div className="mt-3" id="result" style={{ whiteSpace: 'pre-wrap' }}>{result}</div>
    </div>
  );
};

// export default App;

//   return (
//     <div>
//       <h1>3Y Avg Annual Rolling Return Calculator</h1>
//       <input
//         type="text"
//         value={fundCode}
//         onChange={(e) => setFundCode(e.target.value)}
//         placeholder="Enter Mutual Fund Code"
//       />
//       <button onClick={handleCalculate}>Calculate</button>
//       {result !== null && <p>3Y Average Annual Return: {result.toFixed(2)}%</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

export default RollingReturnCalculator;
