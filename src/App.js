import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    fetch('http://localhost:8080/Student/hello')
    .then(Response=>Response.text())
    .then(result=>console.log(result));
  },[]);
  return (
    <div className="App">
     hi to all
    </div>
  );
}

export default App;
