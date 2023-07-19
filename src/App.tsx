import { useEffect, useState } from 'react';
import img from './Graphic_Side.jpg';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [token, setToken] = useState('');
  const [welcomName, setWelcomName] = useState('');

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
    const handleLogin = async (token: string) => {
      const res = await fetch(
        'https://interview-test-api-2bfhetuihq-de.a.run.app/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      const json = await res.json();
      setWelcomName(json.data.name);
    };

    handleLogin(token);
  }, [token]);

  const handleSubmit = async () => {
    if (username === '') {
      setUsernameError('帳號尚未輸入');
      return;
    }
    if (password === '') {
      setPasswordError('密碼尚未輸入');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setUsernameError('請輸入正確的Email格式');
      return;
    }
    if (password.length < 3) {
      setPasswordError('密碼輸入字數過少');
      return;
    }
    try {
      const res = await fetch(
        'https://interview-test-api-2bfhetuihq-de.a.run.app/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const json = await res.json();
      const AccessToken = json.data.token;
      if (isRemember) {
        localStorage.setItem('AccessToken', AccessToken);
      }
      setToken(AccessToken);
    } catch {
      setUsernameError('帳號錯誤');
      setPasswordError('密碼錯誤');
    }
  };

  return (
    <div className="flex w-full min-h-full">
      {token ? (
        <div className="flex justify-center items-center">Hi {welcomName}</div>
      ) : (
        <>
          <div className="flex flex-grow justify-center items-center">
            <div className="flex flex-col p-3 items-center border border-gray-300 rounded w-80">
              <div className="bg-black flex justify-center items-center text-gray-400 text-xs w-full h-8">
                LOGO
              </div>
              <div className="text-3xl font-bold mt-8">Sign In</div>
              <div className="text-gray-400 mt-2 text-sm">
                Sign in to stay connected.
              </div>
              <div className="self-start text-xs text-gray-400 mt-3">
                Username
              </div>
              <input
                type="email"
                value={username}
                className={`${
                  usernameError ? 'border-red-400' : 'border-blue-400'
                } border rounded w-full`}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <div className="self-start text-xs text-red-400">
                  {usernameError}
                </div>
              )}
              <div className="self-start text-xs text-gray-400 mt-3">
                password
              </div>
              <input
                type="password"
                value={password}
                className={`${
                  passwordError ? 'border-red-400' : 'border-blue-400'
                } border rounded w-full`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="self-start text-xs text-red-400">
                  {passwordError}
                </div>
              )}
              <div className="flex justify-between w-full mt-5">
                <label className="text-xs text-gray-400">
                  <input
                    type="checkbox"
                    checked={isRemember}
                    className="mr-1"
                    onChange={(e) => setIsRemember(e.target.checked)}
                  />
                  Remember me?
                </label>
                <button className="text-xs text-blue-700">
                  forgot password?
                </button>
              </div>
              <div
                className="flex justify-center cursor-pointer items-center mt-5 bg-blue-600 text-white rounded w-36 h-8"
                onClick={handleSubmit}
              >
                Sign In
              </div>
            </div>
          </div>
          <img src={img} className="h-[100vh]" />
        </>
      )}
    </div>
  );
}

export default App;
