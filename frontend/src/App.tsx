import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import 'react-loading-skeleton/dist/skeleton.css'
import PlayMusic from './components/PlayMusic';


function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path = "/playlist/:id" element = {<PlaylistPage/>}/>
        </Routes>
      </BrowserRouter>
       
        <PlayMusic/>
      
         
    </Provider>
  )
}

export default App
