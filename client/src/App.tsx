import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <div>
        <main>
          <Outlet />
          <Header />
        </main>
      </div>
    </>
  );
}

export default App;

// {/* <Container fluid>
//       <Row style={{ display: 'flex' }}>
//         <Col md={3} className=''>
//           <Header />
//           {/* Aside on the left */}
//         </Col>
//         <Col md={6} className='bg-danger'>
//           <h1>mitten</h1>
//           {/* Main content in the middle */}
//         </Col>
//         <Col md={3} className='bg-light'>
//           <h1>höger</h1>
//           {/* Aside on the right */}
//         </Col>
//       </Row>
//     </Container> */}
