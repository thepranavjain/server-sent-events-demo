const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });

  const interval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.write(`data: ${randomNumber}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });

  // Send a comment to keep the connection alive
  res.write(": keep-alive\n\n");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
