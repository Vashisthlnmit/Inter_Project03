import { Router } from "express";
import { addToon,GetAllToon,GetToonById,DeleteToon } from "../Controller/Toons_Controller.js";
import { upload } from "../Middleware/multermiddleware.js";
import { authmidddleware } from "../Middleware/authmiddleware.js";
const toonrouter=Router();
toonrouter.route('/addpost').post(authmidddleware,upload.single("Character"),addToon);
toonrouter.route('/getalltoon').get(GetAllToon)
toonrouter.route('/gettonid/:toonid').get(GetToonById)
toonrouter.route('/deletetoon/:toonid').delete(authmidddleware,DeleteToon)
export {toonrouter}
