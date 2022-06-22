import { Router } from "express";
import UsersRoutes from "./users.routes";

//Todas as rotas da nossa aplicação.
const routes = Router();

routes.get('/',(request, response)=>{
    return response.send('Hello Word!');
 })

routes.use('/users', UsersRoutes )

export default routes;