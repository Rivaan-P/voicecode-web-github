const express = require("express");
const app = express();
const fileRoutes = require("./routes/files.js");

app.use(express.json());

app.use("/files", fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
