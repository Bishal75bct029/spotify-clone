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
        <div className=' min-h-screen w-full bg-[#121212] ml-[345px] mt-2 rounded-xl custom-scrollbar h-auto relative-container'>
          <Body />
        </div>
      </div>
    </Provider>
  )
}

export default App
