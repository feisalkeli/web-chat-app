const app = require("express")(); //call the app to get access to the server
const server = require("http").createServer(app);
const cors = require("cors");
//require socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*", //allows access from all origins
    methods: ["GET", "POST"],
  },
});

//make sure cors is being used
app.use(cors()); ///make sure to pass it as a function

///decleare our port
const PORT = process.env.PORT || 5000;

//root route
app.get("/", (req, res) => {
  res.send("Server is Running");
});

////Socket.io Implementation

io.on("connection", (socket) => {
  console.log("a user connected");
  //message on connection
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("call ended");
  });
  socket.on(
    "calluser",
    (
      {
        userToCall,
        signalData,
        from,
        name,
      } /*destructure the data we receive */
    ) => {
      io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    }
  );
  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});
//listen to the server

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
