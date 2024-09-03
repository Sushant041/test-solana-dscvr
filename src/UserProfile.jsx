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

const UserProfile = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      setLoading(true);
      const data = await client.request(GET_USER_DATA, { username });
      setUserData(data.userByName);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, [username]);

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
