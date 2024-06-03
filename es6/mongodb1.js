//mongodb
//1. nosql db
//2. collections and documents, instead of table and rows
//3. json format <bson -key, value>
//4. schemaless
//5. document based - like json file but binary encrypted

//documents
//userDetails - collection
{
  name = "Ha",
  sessions = {
    session1 : "MernStack",
    session2 : "Spring",
    session3 : "Interview Prep",
  }
}

{
  name = "Kate",
  sessions = {
    session1 : "MernStack",
    session2 : "Spring",
    session3 : "Interview Prep",
    session4 : "Interview"
  }
}

{
  name = "Taylor",
  learnings = {
    session1 : "MernStack",
    session2 : "Spring",
    session3 : "Interview Prep",
    session4 : "Interview"
  }
}

//handler to check if db server is there or not
//use the connection string to make connection
//get read/write access on db and allow us to do manipulation
//provide functions to read data, add, update, delete etc
//once done close the connection

//another module: mongoose - this helps us to do all other jobs listed above + 
//also allows us to create schema


