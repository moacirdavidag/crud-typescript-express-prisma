import { Router } from 'express';
import { ProductController } from "../controllers/ProductController";
const productController = new ProductController();

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export { router };