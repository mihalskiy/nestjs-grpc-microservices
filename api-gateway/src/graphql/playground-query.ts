export const playgroundQuery = `mutation createNewUser {
  createNewUser(
    data: {
      name: "Sample User"
      email: "user1@example.com"
      age: 18
    }
  ) {
    user {
      id
      name
      email
      age
      createdAt
      updatedAt
      version
    }
    errors {
      field
      message
    }
  }
}

mutation updateUser {
  updateUser(
    id: "<replace with user id>"
    data: {
      name: "updateUser Sample User"
      email: "updateUseruser1@example.com"
      age: 23
     }
  ) {
    errors {
      field
      message
    }
  }
}

query findUsers {
  users(first: 50) {
    edges {
      node {
        id
        name
        email
        age
        createdAt
        updatedAt
        version
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}

query findUser {
  user(id: "<replace with user id>") {
    id
    name
    email
    age
    createdAt
    updatedAt
    version
  }
}

subscription userCreated {
  userCreated(user: "<replace with post id>") {
    id
    name
    email
    age
    createdAt
    updatedAt
    version
  }
}

mutation destroyUser {
  destroyUser(id: "<replace with user id>") {
    errors {
      field
      message
    }
    count
  }
}

query userCount {
  userCount
}
`
