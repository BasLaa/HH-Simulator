import ParentSingle from './components/ParentSingle'
import ParentCoupled from './components/ParentCoupled'
import {useState} from 'react';

function App() {

  const [type, setType] = useState("single")

  const handleSelect = (event) => {
    setType(event.target.value);
  }

  return (
    <div>
      <h2 className="header">Hodgkin-Huxley Model</h2>
      <select onChange={handleSelect}>
        <option value="single">Single Neuron</option>
        <option value="fb">Coupled Neurons</option>
      </select>
      {type === "single" ? <ParentSingle /> : <ParentCoupled />}
    </div>
  );
}

// makes available outside file
export default App;
