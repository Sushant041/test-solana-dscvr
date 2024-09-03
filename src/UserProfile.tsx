import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

// Initialize the GraphQL client with the DSCVR endpoint
const client = new GraphQLClient('https://api.dscvr.one/graphql');

// Define the GraphQL query for fetching user data by username
const GET_USER_DATA = gql`
  query GetUserData($username: String!) {
    userByName(name: $username) {
      id
      followingCount
      followerCount
      dscvrPoints
    }
  }
`;

// Define the TypeScript interfaces for the user data
interface UserProfileProps {
  username: string; // This could be the ID of the logged-in user who is viewing the profile
}

interface UserProfileData {
  id: string;
  followingCount: number;
  followerCount: number;
  dscvrPoints: string;
}

interface UserByNameResponse {
    userByName: {
      id: string;
      followingCount: number;
      followerCount: number;
      dscvrPoints: string;
    };
  }

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true);
      const data : UserByNameResponse = await client.request(GET_USER_DATA, { username});
      setUserData(data.userByName);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return userData ? (
    <div>
      <p>User ID: {userData.id}</p>
      <p>Following: {userData.followingCount}</p>
      <p>Followers: {userData.followerCount}</p>
      <p>DSCVR Points: {userData.dscvrPoints}</p>
    </div>
  ) : (
    <div>No user data found</div>
  );
};

export default UserProfile;
