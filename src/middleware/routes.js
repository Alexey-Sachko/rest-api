import Router from 'koa-router';
//import product from '../models/product';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { ObjectId } from "mongodb";

const router = new Router(),
koaBody = convert(KoaBody());

router
  .get('/users', async (ctx, next) => {
      ctx.body = await ctx.app.users.find().toArray();
  })

  .get('/users/:id', async (ctx, next) => {
      const id = new ObjectId(ctx.params.id);
      let result = await ctx.app.users.findOne({ _id: id });
      if (result) {
          ctx.body = result
      } else {
          ctx.status = 204
      }
  })

  .post('/users', koaBody, async (ctx, next) => {
      ctx.status = 201;
      ctx.body = await ctx.app.users.insertOne(ctx.request.body);
  })

//   .put('/product/:id', koaBody, async (ctx, next) => {
//       ctx.status = 204;
//       await product.update(ctx.params.id, ctx.request.body);
//   })

//   .delete('/product/:id', async (ctx, next) => {
//       ctx.status = 204;
//       await product.delete(ctx.params.id);
//   });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }