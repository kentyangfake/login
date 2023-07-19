import { useEffect, useState } from 'react';
import img from './Graphic_Side.jpg';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';

const API_BASE_URL = 'https://interview-test-api-2bfhetuihq-de.a.run.app';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [token, setToken] = useState('');
  const [welcomName, setWelcomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem('AccessToken');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchUserData = async (token: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const json = await res.json();
        setWelcomName(json.data.name);
        setUsername('');
        setPassword('');
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData(token);
  }, [token]);

  const validateForm = () => {
    let isValid = true;

    if (username === '') {
      setUsernameError('帳號尚未輸入');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      setUsernameError('請輸入正確的Email格式');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password === '') {
      setPasswordError('密碼尚未輸入');
      isValid = false;
    } else if (password.length < 3) {
      setPasswordError('密碼輸入字數過少');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const { data } = await res.json();
      const { token: AccessToken } = data;
      if (isRemember) {
        localStorage.setItem('AccessToken', AccessToken);
      }
      setToken(AccessToken);
    } catch {
      setUsernameError('帳號錯誤');
      setPasswordError('密碼錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    setToken('');
  };

  return (
    <div className="flex w-full min-h-full">
      {token ? (
        <Welcome welcomName={welcomName} handleLogout={handleLogout} />
      ) : (
        <>
          <LoginForm
            username={username}
            password={password}
            isRemember={isRemember}
            usernameError={usernameError}
            passwordError={passwordError}
            isLoading={isLoading}
            setUsername={setUsername}
            setPassword={setPassword}
            setIsRemember={setIsRemember}
            handleSubmit={handleSubmit}
          />
          <img alt="background" src={img} className="h-[100vh]" />
        </>
      )}
    </div>
  );
}

export default App;
