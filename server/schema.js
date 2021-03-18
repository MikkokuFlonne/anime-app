const { gql } = require('apollo-server');

const typeDefs = gql`
type query ($page: Int){
    Page(page: $page, perPage: 1) {
      pageInfo {
        total: Int
        currentPage: Int
        lastPage: Int
        hasNextPage: Int
        perPage: Int
      }
      media(sort: SCORE_DESC, format: TV) {
        id: int!
        title {
          english: String
          romaji: String
          native: String
        }
        genres: String
        episodes: Int
        averageScore: Int
        description: String
        popularity: Int
        status: MediaStatus
        trailer {
          id: String
          site: String
          thumbnail: String
        }
        rankings{
          context: String!
          rank: Int!
        }
      }
    }
  }
  
`;

module.exports = typeDefs;