import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar, faUsers, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGitHubUser = async () => {
    setError("");
    setUserData(null);
    setRepos([]);
    setLoading(true);

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error("User not found");
      const user = await userResponse.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`
      );
      const repoData = await repoResponse.json();

      setUserData(user);
      setRepos(repoData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* App Bar */}
      <div className="app-bar">
        <div className="app-title">
          <FontAwesomeIcon icon={faSearch} /> GitHub User Finder
        </div>
        <div className="nav-links">
          <a href="#about">About Us</a>
          <span>|</span>
          <a href="#search">Search</a>
          <span>|</span>
          <a href="#contact">Contact Us</a>
        </div>
      </div>

      <div className="main-content">
        
        <div id="about" className="about-us">
          <h2>About Us</h2>
          <p><h2>Welcome to the GitHub User Finder!</h2>
           Our tool is designed to help you quickly find and explore GitHub user profiles along with their top repositories. Whether you're a developer looking to collaborate, a recruiter searching for talent, or simply curious about a user's contributions, our app provides an easy-to-use interface for discovering valuable information. With real-time data fetched directly from GitHub, you can trust that you're seeing the most up-to-date details.</p>
        </div>

        {/* Search Bar */}
        <div id="search" className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchGitHubUser}>
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="loading">Loading...</div>}

        {/* Result Card */}
        {error && !loading && <div className="error-message">{error}</div>}
        {userData && !error && (
          <div className="result-card">
            {/* User Profile */}
            <div className="profile-card">
              <img className="avatar" src={userData.avatar_url} alt="Profile" />
              <h2>{userData.name}</h2>
              <p>@{userData.login}</p>
              <p>{userData.bio}</p>
              <p><FontAwesomeIcon icon={faUsers} /> Followers: {userData.followers}</p>
              <p>Following: {userData.following}</p>
              <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>

            {/* Repository List */}
            <div className="repo-list">
              <h2>Top Repositories</h2>
              <ul>
                {repos.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a> <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
                    <p>{repo.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Contact Us and Footer */}
      <div className="contact-footer">
        <div id="contact" className="contact-card">
          <h2>Contact Us</h2>
          <p><FontAwesomeIcon icon={faPhone} /> +1234567890</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> email@example.com</p>
          <div className="social-icons">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
        <div className="footer">
          <p>&copy; 2025 GitHub User Finder | <a href="#about">About</a> | <a href="#search">Search</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;