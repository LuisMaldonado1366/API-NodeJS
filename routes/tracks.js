const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const {
  validatorCreateItem,
  validatorReadItem,
} = require("../validators/tracks");
const {
  getItems,
  createItem,
  readItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const checkRole = require("../middleware/role");

//todo   http://localhost/tracks GET, POST, DELETE  PUT.
/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: List all tracks
 *      description: Retrieve all undeleted saved tracks within database.
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns all the non-deleted tracks stored within the database.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Validation error.
 */
router.get("/", authMiddleware, checkRole(["admin", "user"]), getItems);

/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: Register track
 *      description: Register a new track within the database and retrieves the store data.
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns the object registered.
 *        '422':
 *          description: Validation Error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Returns the updated track with status '201'.
 *      '403':
 *        description: Unauthorized access.
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorCreateItem,
  createItem
);


/**
 * Read track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: Track detailed data.
 *      description: Retrieves all data within a track object.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id for the track to return.
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the track's data.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
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
 * Update track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: Update track
 *      description: Update a track and retrieved the stored data.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id for the track to query.
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns the updated track.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Returns the updated track with status '201'.
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/track'
 *      '403':
 *        description: Unauthorized access.
 */
router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  validatorReadItem,
  validatorCreateItem,
  updateItem
);


/**
 * Delete track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: Delete track
 *      description: Delete track's details.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Track id (can be retrieved with the List tracks resource).
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns al the track data.
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
