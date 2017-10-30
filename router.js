import express from 'express'


import * as controller from './controller'





const router=express.Router();



router
    .get('/',controller.showIndex)  //展示首页
    .get('/add',controller.showAdd)   //展示添加页面
    .get('/edit',controller.showEdit)  //展示  编辑页面
    .post('/edit',controller.doEdit)    //提交编辑页
    .get('/remove',controller.doDelete)   //删除接口
    .post('/add',controller.doAdd)      //提交添加页
    .get('/login',controller.showLogin)  //展示登录页面
    .post('/login',controller.doLogin)   //提交登录页面

export default router;