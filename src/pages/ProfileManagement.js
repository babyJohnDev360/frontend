import React, { useState } from 'react';
import Loader from '../components/common/Loader';

function ProfileManagement() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = () => {
    setLoading(true);
    // Simulate a fetch call to get profiles
    setTimeout(() => {
      // This is where you would fetch your profiles data
      setProfiles([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321' },
        // Add more profiles as needed
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for fetching data
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <button onClick={fetchProfiles}>Load Profiles</button>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {profiles.map(profile => (
            <li key={profile.id}>
              {profile.name} - {profile.email} - {profile.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfileManagement;