const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const authMiddleware = require("../middleware/session");
const { validatorReadItem } = require("../validators/storage");
const {
  getItems,
  createItem,
  readItem,
  deleteItem,
} = require("../controllers/storage");
const checkRole = require("../middleware/role");
//todo   http://localhost:{PORT}/storage GET, POST, DELETE  PUT.

/**
 * Get all items.
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: Get all items.
 *      description: Retrieve all the stored items.
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns all the undeleted  storage registers.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Validation error.
 */
router.get("/", authMiddleware, checkRole(["admin", "user"]), getItems);


/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Subir un archivo
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  uploadMiddleware.single("uploadFile"),
  createItem
);

/**
 * Read detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Detalle storage"
 *      description: Obten el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de storage a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validacion.
 */
router.get(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorReadItem,
  readItem
);

/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Eliminar storage"
 *      description: Elimiar el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validacion.
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  validatorReadItem,
  deleteItem
);

module.exports = router;
