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
 *      summary: Get all the media data stored.
 *      description: Retrieve all the non-deleted stored items.
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
 *      summary: Upload a file
 *      description: Upload a media file.
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the inserted object data.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uploadFile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Returns the inserted object data with code '201'
 *      '403':
 *        description: Forbidden Access '403'
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
 *      summary: Get all the stored item data.
 *      description: Retrieves all the data related to the given id.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Stored media Id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the object data.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Validation error.
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
 *      summary: Delete stored item.
 *      description: Deletes the stored data of the diven item id.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Media Id to be deleted.
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the media data.
 *        '422':
 *          description: Validation error.
 */
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  validatorReadItem,
  deleteItem
);

module.exports = router;
