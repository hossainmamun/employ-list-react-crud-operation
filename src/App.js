import { Routes, Route } from 'react-router-dom';
import EmployerInfo from './Component/EmployerInfo.js';
import UserInfo from './Component/UserInfo.js';

function App() {
   return (
      <Routes>
         <Route path='/' element={<EmployerInfo />} />
      </Routes>
   );
}

export default App;
