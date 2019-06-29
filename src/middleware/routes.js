import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { ObjectId } from "mongodb";

const router = new Router(),
koaBody = convert(KoaBody());

router
  .get('/users', async (ctx, next) => {
      ctx.body = await ctx.app.User.find({});
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
      const { User } = ctx.app;
      const { name, password } = ctx.request.body;
      const user = new User({ name, password });
    
      ctx.status = 201;
      ctx.body = await user.save()
        .then((res) => {
            return res;
        })
  })

  .delete('/users/:id', async (ctx, next) => {
      const id = new ObjectId(ctx.params.id);
      ctx.body = await ctx.app.User.remove({ _id: id })
        .then((res) => {
            return res.value
        })
  })

  .put('/users/:id', koaBody, async (ctx, next) => {
      ctx.status = 201;
      const id = new ObjectId(ctx.params.id);
      const { body } = ctx.request;
      const userName = body.name;
      const userPassword = body.password;

      ctx.body = await ctx.app.users
        .findOneAndUpdate({ _id: id }, { $set: { password: userPassword, name: userName } }, { returnOriginal: false })
        .then((res) => {
            return res.value
        })
  })

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }