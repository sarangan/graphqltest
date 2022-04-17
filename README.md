# graphqltest

query

```
{
  user(id: 1){
    name,
    hobbies {
      description
    }
  }
}

```

mutation 
```
mutation{
  createUser(name: "saran", age: 23){
    name,
    hobbies{
      name
    }
  }
}

```

list 
```
{
  users {
    name,
    age
  }
}
```
