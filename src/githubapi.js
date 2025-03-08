import axios from "axios";

const BASE_URL = "https://api.github.com/users/";

export const fetchGitHubUser = async (username) => {
  try {
    const userResponse = await axios.get(`${BASE_URL}${username}`);
    const reposResponse = await axios.get(
      `${BASE_URL}${username}/repos?sort=stars&per_page=5`
    );

    return { user: userResponse.data, repos: reposResponse.data };
  } catch (error) {
    throw new Error("User not found or API limit reached.");
  }
};
