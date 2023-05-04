import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginForm } from '../components/LoginForm';
import chatterappLogo from '../assets/chatterapplogo.svg';


function Login() {
  return (
    <div className='login-body'>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
