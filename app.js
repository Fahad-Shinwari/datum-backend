const express = require('express');
var cors = require('cors')
const socket = require("socket.io");
const app = express();
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const category = require('./routes/category');
const blog = require('./routes/blog');
const comment = require('./routes/comment');
const navigation = require('./routes/navigation');
const newCategory = require('./routes/newCategory');
const like = require('./routes/like');
const message = require('./routes/message');
const upload = require('./controllers/fileUpload');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(cors())
// Images directory
app.use("/images", express.static("images"));
app.use(express.json());


// routes 

app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', auth);
app.use('/api/v1/category', category);
app.use('/api/v1/blog', blog);
app.use('/api/v1/comment', comment);
app.use('/api/v1/like', like);
app.use("/api/v1/messages", message);
app.use("/api/v1/upload", upload);
app.use("/api/v1/navigation", navigation);
app.use("/api/v1/newcategory", newCategory);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on ${port}`)
);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server
  } catch (error) {
    console.log(error);
  }
};

start();
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", 
    credentials: true,
  },
});

global.onlineUsers = new Map();
global.notifications = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("add-notifications", (userId) => {
    console.log(userId)
    notifications.set(userId, socket.id);
    console.log(notifications)
  });

  // socket.broadcast.emit('post-liked', 'this is a message');

  socket.on("liked-post", (blog) => {
    const sendUserSocket = notifications.get(blog.admin);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("post-liked",blog);
      }
  });
  socket.on("disliked-post", (blog) => {
    const sendUserSocket = notifications.get(blog.admin);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("post-disliked",blog);
      }
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
