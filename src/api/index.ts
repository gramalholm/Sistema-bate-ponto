//Script que mostra em que porta da nossa localhost o servidor estará sendo executado.
import { app } from './server/Server';
app.listen(3000, () => console.log("App rodando"));