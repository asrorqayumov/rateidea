module.exports = {
  branches: 'main',
  repositoryUrl: 'https://github.com/josh-developer/rate-ideas',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};
