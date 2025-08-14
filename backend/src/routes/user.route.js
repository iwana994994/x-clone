import express from 'express';
import { userSync } from '../controllers/user.controller.js';
import { requireAuth } from '@clerk/express';

const route= express.Router();

route.post("/sync",requireAuth(),userSync)

export default route;