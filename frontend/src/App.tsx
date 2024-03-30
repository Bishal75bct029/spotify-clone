import './App.css'
import Body from './components/Body'
import SideNav from './components/SideNav'

import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <div className='flex justify-between gap-4 relative'>
        <div>

          <SideNav />
        </div>
        <div className='min-h-screen w-full bg-[#121212] flex-1 ml-[345px]'>

          <Body />
        </div>
      </div>
    </Provider>
  )
}

export default App
