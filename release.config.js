module.exports = {
  branches: 'main',
  repositoryUrl: 'https://github.com/josh-developer/CI-CD-practice',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};
