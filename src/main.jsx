import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/css/App.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter >
      <App />
    </BrowserRouter>
)
