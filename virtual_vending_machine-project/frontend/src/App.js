import VendingMachine from "./components/VendingMachine";
import { useState, useEffect } from "react"

function App() {

  // Variable data initialized with the useState() hook used to store and set the sodas data
  const [data, setData] = useState([])

  // useEffect() hook used to retrieve the list of sodas from the API and store the data
  useEffect(() => {
    fetch('http://localhost:8000/sodas')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <div>
      <VendingMachine data={data} />
    </div>
  );
}

export default App;
