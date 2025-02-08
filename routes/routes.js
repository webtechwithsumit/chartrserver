import express from 'express';
import { create, get, Updated, Delete, getsingle, getsingledata } from '../controllers/usercontrollers.js';

const routers = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Create
 *     description: Endpoints for creating resources
 *   - name: Read
 *     description: Endpoints for retrieving resources
 *   - name: Update
 *     description: Endpoints for updating resources
 *   - name: Delete
 *     description: Endpoints for deleting resources
 */

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Create]
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busstart:
 *                 type: string
 *                 description: Starting point of the bus
 *               bus:
 *                 type: string
 *                 description: Name or number of the bus
 *               price:
 *                 type: number
 *                 description: Ticket price
 *               quantity:
 *                 type: number
 *                 description: Number of tickets
 *               time:
 *                 type: string
 *                 description: Departure time
 *               ending:
 *                 type: string
 *                 description: Ending point of the bus
 *               backgroundColor:
 *                 type: string
 *                 description: Color for UI representation
 *               numberplate:
 *                 type: string
 *                 description: Bus number plate
 *               randomId:
 *                 type: string
 *                 description: A randomly generated identifier
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
routers.post('/create', create);

/**
 * @swagger
 * /api/get:
 *   get:
 *     summary: Get all users
 *     tags: [Read]
 *     description: Retrieves a list of all users from the system.
 *     responses:
 *       200:
 *         description: A list of users
 */
routers.get('/get', get);

/**
 * @swagger
 * /api/getsingle:
 *   get:
 *     summary: Get a single user without ID
 *     tags: [Read]
 *     description: Retrieves a single user without requiring an ID.
 *     responses:
 *       200:
 *         description: Single user retrieved
 */
routers.get('/getsingle', getsingle);

/**
 * @swagger
 * /api/getsingledata/{_id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Read]
 *     description: Retrieves a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Single user retrieved
 *       404:
 *         description: User not found
 */
routers.get('/getsingledata/:_id', getsingledata);

/**
 * @swagger
 * /api/update/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Update]
 *     description: Updates an existing user in the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
routers.put('/update/:id', Updated);

/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Delete]
 *     description: Deletes a user from the system by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
routers.delete('/delete/:id', Delete);

export default routers;
