# [GraphQL](https://docs.google.com/presentation/d/130oGwwa5ZHCxEcKsraJzhuQQfPq_XeTwJn7yWhhxLmw)

> A **spec** that describes a declarative query language that your clients can use to ask an API for the exact data they want.
> This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema.

## Client Side

* Queries
* Mutations
* Fragments

### Operation names

* Unique names for your client side Query and Mutation operations.
* Used for client side caching, indexing inside of tools like GraphQL playground, etc.
* Like naming your functions in JS vs keeping them anonymous.

### Variables with operation

* Operations can define arguments, very much like a function in most programming languages.
* Those variables can then be passed to query / mutation calls inside the operation as arguments.
* Variables are expected to be given at run time during operation execution from your client.

## Apollo Client

* Encapsulates HTTP logic used to interact with a GraphQL API.
* Doubles as a client side state management alternative as well.
* If your GraphQL API is also an Apollo Server, provides some extra features.
* Offers a plug approach for extending its capabilities.
* It’s also framework independent.

## Storing data from your API

* All nodes are stored flat by an unique ID.
* Unique ID is defaulted to .id or ._id from nodes. You can change this.
* Every node should send an .id or ._id, or none at all. Or you have to customize that logic.

### [Check me out](https://static.frontendmasters.com/resources/2019-10-14-full-stack-graphql/client-graphql-react.pdf)
