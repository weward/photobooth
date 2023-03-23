import { Provider } from 'react-redux'
import './dist/App.css';
import index from './store'
import NavBar  from './components/NavBar';

function App() {
  return (
    <Provider store={ index }>
      <div className="App">
        
        <NavBar/>

      </div>
    </Provider>
  );
}

export default App;
