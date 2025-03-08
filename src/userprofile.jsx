import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="profile">
      <img src={user.avatar_url} alt="Avatar" className="avatar" />
      <h2>{user.name || "No Name"}</h2>
      <p>{user.bio || "No Bio Available"}</p>
      <p>Followers: {user.followers} | Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>
  );
};

export default UserProfile;
