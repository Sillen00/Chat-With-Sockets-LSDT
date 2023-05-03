import { LoginForm } from '../components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
