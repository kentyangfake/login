type WelcomeProps = {
  welcomName: string;
  handleLogout: () => void;
};

const Welcome: React.FC<WelcomeProps> = ({ welcomName, handleLogout }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      Hi {welcomName}
      <div
        className="flex justify-center cursor-pointer items-center mt-5 bg-blue-600 text-white rounded w-36 h-8"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Welcome;
