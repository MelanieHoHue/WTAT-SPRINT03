//--DB OPERATIONS------------------------------------------

// new and save 
var subscriber1 = new Subscriber({
    name: "Hilly",
    email: "hilly@yahoo.com",
    zipCode: 12578
  });
  
  subscriber1.save((error, savedDocument) => {
    if (error) console.log(error);
    console.log(savedDocument);
  });
  
  // create
  Subscriber.create(
    {
      name: "Bruno",
      email: "bruno@berlin.de",
      zipCode: 24348
    },
    function (error, savedDocument) {
      if (error) console.log(error);
      console.log(savedDocument);
    }
  );

//--QUERYING---------------------------------------------

// findOne()
var myQuery = Subscriber.find({
    name: "Katja"
}).where("email", /com/);

myQuery.exec((error, data) => {
  if (error) console.log(error);
  console.log("findOne() ------------------");
  console.log(data);
});

// find() - all ... where ...
var myQuery = Subscriber.find({
}).where("email", /com/);

myQuery.exec((error, data) => {
  if (error) console.log(error);
  console.log("find() ... all -------------");
  console.log(data);
});

