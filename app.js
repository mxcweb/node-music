import express from 'express'
import bodyParser from 'body-parser'
import querystring from 'querystring'
import path from 'path'


import router from './router'
import config from './config'

const app=express();

//给req对象绑定body属性，这样表单提交的数据就可以用req.body来访问
app.use(bodyParser.urlencoded({extend:false}))

//配置静态资源
/*  config.staticPaths.forEach((staticPath,index)=>{
    app.use(`${path.basename(staticPath)}`,express.static(staticPath))
}) */
app.use('/www',express.static(path.join(__dirname,'www')))
 
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))
//配置 ejs模板引擎
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


//挂载路由
app.use(router);




app.listen(config.port,config.host,(err)=>{
    if(err) throw err;
    console.log('server is on line');
    console.log(`please visit on ${config.host}:${config.port}`)
})


    