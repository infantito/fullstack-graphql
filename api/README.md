# GraphQL

> A **spec** that describes a declarative query language that your clients can use to ask an API for the exact data they want.
> This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema.

## Server Side

* Type Definitions
* Resolvers
* Query Definitions
* Mutation Definitions
* Composition
* Schema

## Schema

* Using Schema Definition Language **(SDL)**
* Programmatically Creating a Schema using language constructs

## Query

A **Type** on a Schema that defines operations clients can perform to access data that resembles the shape of the other Types in the Schema.

### Resolvers

Functions that are responsible for returning values for fields that exist on Types in a Schema. Resolvers execution is dependent on the incoming client Query.

### Arguments

* Allows clients to pass variables along with Queries that can be used in your Resolvers to get data
* Must be defined in your Schema
* Can be added to any field
* Either have to be Scalars or Input Types

### Input Type

* Just like Types, but used for Arguments
* All field value types must be other Input Types or Scalars

### Scalars

* Int: A signed 32‐bit integer.
* Float: A signed double-precision floating-point value.
* String: A UTF‐8 character sequence.
* Boolean: true or false.
* ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

> In most GraphQL service implementations, there is also a way to specify custom scalar types. For example, we could define a Date type:
> scalar `Date`

## Mutation

A **Type** on a Schema that defines operations clients can perform to mutate data (create, update, delete).

### Enums

* A set of discrete values that can be used in place of Scalars.
* An enum field must resolve to one of the values in the Enum. Great for limiting a field to only a few different options.

### Interfaces

* Abstract Types that can’t be used as field values but instead used as foundations for explicit Types.
* Great for when you have Types that share common fields, but differ slightly.

### Unions

* Like interfaces, but without any defined common fields amongst the Types.
* Useful when you need to access more than one disjoint Type from one Query, like a search.
