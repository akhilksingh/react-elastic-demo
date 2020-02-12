// const Koa = require('koa')
// const Router = require('koa-router');
// const joi = require('joi');
// const validate = require('koa-joi-validate');
// const search = require('./search');
// const path = require('path');
// const multer = require('multer');

// // Setup Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,'./uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + file.originalname );
//   }
// });

// // Upload Instance for single file
// const upload = multer({ storage }).single('file');

// const app = new Koa();
// const router = new Router();

// // Log each request to the console
// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now()- start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
// })

// // Log percolated errors to the console
// app.on('error', err => {
//   console.error('Server Error', err)
// })

// // Set permissive CORS header
// app.use(async(ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   await next();
// })

// // Add Endpoints here

// app.use(async(ctx, next) => {
//   ctx.body ="Hello from the Backend"
// })

// router.get('/upload', async(ctx, next) => {
//     ctx.body ="Hello from the Backend"
//     next();
//   });

// router.post('/upload', ctx => {

//   const { file } = ctx.req;
//   try {
//     upload(ctx.req, ctx.res, (err) =>{
//       if (err instanceof multer.MulterError) {
//         return ctx.status(500).json(err)
//       } else if (err) {
//         return ctx.status(500).json(err)
//       }
//     })
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post('/upload', async ctx => {

//   const { file } = ctx.req;
//   try {
//     const res = await upload(ctx.req, ctx.res, (err) =>{
//       if (err instanceof multer.MulterError) {
//         return ctx.status(500).json(err)
//       } else if (err) {
//         return ctx.status(500).json(err)
//         console.log("promise")
//       }
//       ctx.body = "success";
//       return true;
//     })
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// });















//   /**
//  * GET /search
//  * Search for a term in the library
//  */
// router.get('/search', validate({
//   query: {
//     term: joi.string().max(60).required(),
//     offset: joi.number().integer().min(0).default(0)
//   }
// }),async (ctx, next) => {
//   const { term, offset } = ctx.request.query
//   ctx.body = await search.queryTerm(term, offset)
// });

// /**
//  * GET /paragraphs
//  * Get a range of paragraphs from the specified book
//  * Query Params -
//  * bookTitle: string under 256 characters
//  * start: positive integer
//  * end: positive integer greater than start
//  */
// router.get('/paragraphs',
//   validate({
//     query: {
//       bookTitle: joi.string().max(256).required(),
//       start: joi.number().integer().min(0).default(0),
//       end: joi.number().integer().greater(joi.ref('start')).default(10)
//     }
//   }),
//   async (ctx, next) => {
//     const { bookTitle, start, end } = ctx.request.query
//     ctx.body = await search.getParagraphs(bookTitle, start, end)
//   }
// )

// const port = process.env.PORT || 3001

// app
//   .use(router.routes())
//   .use(router.allowedMethods())
//   .listen(port, err => {
//     if (err) console.error(err)
//     console.log(`App Listening on Port ${port}`)
//   }) 