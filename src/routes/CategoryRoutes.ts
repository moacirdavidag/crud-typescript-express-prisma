import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
const categoryController = new CategoryController();

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.post("/categoryProduct", categoryController.insertCategoryProduct);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export = router;