# README

```graphql
query Person {
  node(id: "") {
    ... on Person {
      slug
      name
      content
      accounts(first: 5, types: ["TWITTER", "YOUTUBE"]) {
        edges {
          node {
            ... on TwitterAccount {
              __typename
              id
            }
            ... on YouTubeAccount {
              __typename
              id
            }
          }
        }
      }
      twitterAccounts(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      youtubeAccounts(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      events(first: 5) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
}
```
