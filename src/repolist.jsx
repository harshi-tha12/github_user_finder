import React from "react";

const RepoList = ({ repos }) => {
  return (
    <div className="repos">
      <h2>Top Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>⭐ {repo.stargazers_count}</p>
            <p>{repo.description || "No Description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
