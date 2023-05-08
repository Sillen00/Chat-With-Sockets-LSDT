import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
