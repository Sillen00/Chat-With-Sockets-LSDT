// import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginForm } from '../components/LoginForm';

function Login() {
  return (
    // <div className='login-body'>
    // <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <LoginForm />
    </div>
    // </div>
    // </div>
  );
}

export default Login;
