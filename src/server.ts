import express from "express";
import RoutesMeasures from "./routes/routes.measures";

const app = express();

app.use(express.json());
app.use("/", RoutesMeasures);

app.listen(process.env.PORT || 3001);


export {app};