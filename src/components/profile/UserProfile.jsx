import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import dynamoDbClient from '../../dynamodb-client';
import { auth } from '../../firebase'; // Adjust the import path as necessary

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch additional profile data from DynamoDB
        const fetchProfileData = async () => {
          const params = {
            TableName: 'YourDynamoDBTableName',
            Key: { userId: firebaseUser.uid },
          };
          try {
            const { Item } = await dynamoDbClient.get(params).promise();
            setProfile(Item);
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };
        fetchProfileData();
      } else {
        setProfile(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {/* Display user profile information */}
    </div>
  );
};

export default UserProfile;
