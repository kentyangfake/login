type LoginFormProps = {
  username: string;
  password: string;
  isRemember: boolean;
  usernameError: string;
  passwordError: string;
  isLoading: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsRemember: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
};

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  isRemember,
  usernameError,
  passwordError,
  isLoading,
  setUsername,
  setPassword,
  setIsRemember,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="flex flex-col p-3 items-center border border-gray-300 rounded w-80">
        <div className="bg-black flex justify-center items-center text-gray-400 text-xs w-full h-8">
          LOGO
        </div>
        <div className="text-3xl font-bold mt-8">Sign In</div>
        <div className="text-gray-400 mt-2 text-sm">
          Sign in to stay connected.
        </div>
        <div className="self-start text-xs text-gray-400 mt-3">Username</div>
        <input
          type="email"
          value={username}
          className={`${
            usernameError ? 'border-red-400' : 'border-blue-400'
          } border rounded w-full`}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && (
          <div className="self-start text-xs text-red-400">{usernameError}</div>
        )}
        <div className="self-start text-xs text-gray-400 mt-3">password</div>
        <input
          type="password"
          value={password}
          className={`${
            passwordError ? 'border-red-400' : 'border-blue-400'
          } border rounded w-full`}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <div className="self-start text-xs text-red-400">{passwordError}</div>
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
          <button className="text-xs text-blue-700">forgot password?</button>
        </div>
        <div
          className="flex justify-center cursor-pointer items-center mt-5 bg-blue-600 text-white rounded w-36 h-8"
          onClick={() => {
            if (isLoading) return;
            handleSubmit();
          }}
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
