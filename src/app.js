import Koa from 'koa';
import config from  'config';
import err from './middleware/error';
import { logger, responseTime} from './middleware/logger';
import {routes, allowedMethods} from './middleware/routes';
import connectMongodb from './root/mongo';

const app = new Koa();
connectMongodb(app);

app.use(logger);
app.use(responseTime);
app.use(err);
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  });
app.use(routes());
app.use(allowedMethods());

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});