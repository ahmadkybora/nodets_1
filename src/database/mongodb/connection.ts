import { connect, connection, Promise } from "mongoose";
import { ConnectOptions } from "typeorm/driver/mongodb/typings";

// const MONGO_URI = process.env.MONGO_URI as string;

connect("mongodb://127.0.0.1:27017/chat");
connection.on("error", (error: Error) => console.log(error));

// connect("mongodb://127.0.0.1:27017/chat", {
//   useNewUrlParser: "true",
//   useUnifiedTopology: "true"
// }as ConnectOptions);

// const MONGO_URI: string = process.env.MONGO_URI;
// connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log("---------------------");
//         console.log("Connected to MongoDB");
//         console.log("---------------------");
// })
//     .catch((err) => {
//         console.log(err)
// });
