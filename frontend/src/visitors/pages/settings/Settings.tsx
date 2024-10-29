import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('guest@example.com');
  const [darkMode, setDarkMode] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div>
      <h1>Settings</h1>
      
      <div>
        <h2>Profile Information</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>

      <div>
        <h2>Preferences</h2>
        <label>
          Dark Mode:
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        </label>
      </div>

      <div>
        <h2>Other Settings</h2>
        <p><a href="#account">Account Settings</a></p>
        <p><a href="#notifications">Notification Preferences</a></p>
      </div>
    </div>
  );
};

export default Settings;
