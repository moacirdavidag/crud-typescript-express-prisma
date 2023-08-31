import express from "express";

import router from "./routes/CategoryRoutes";
import { router as productRoutes } from "./routes/ProductRoutes";

const app = express();
app.use(express.json());

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", router);

app.listen(3000, () => console.log(`O servidor está rodando na porta 3000`));