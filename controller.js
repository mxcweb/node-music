import path from 'path'
import formidable from 'formidable'
import Music from './music'

//以show开头的方法只负责展示

function showIndex(req,res){
    res.render('index',{
        musicList:Music.getAll()
    });
} 

function showAdd(req,res){
    res.render('add',{
        'subTitle':'添加音乐'
    })
}

function showEdit(req,res){
    //console.log(req.query.id)
    var musicId=parseInt(req.query.id);
    //app.js里面设置了body-parser,请求的参数就可以在req.body里面看到了，但是他是A链接跳过来的，所以body里面是空对象{}，必须是
    //表单提交过来的才可以在body里面看见
   // console.log(req.body.id);
   // console.log(musicId);
    let music=Music.getById(musicId);
   // console.log(music)
    if(!music){
      return   res.send('进入编辑页面的方式不对，必须点击编辑')
    }

    res.render("edit",{
        music:music
    })
}
//以do开头的方法是做了操作的
function doEdit(req,res){
    var id=parseInt(req.query.id);
    var singer=req.body.singer;
    var title=req.body.title;

    if(!Music.getById(id)){
        return res.send('musicId not exists')
    }
    var music=new Music(singer,title)
    music.updateById(id);
    res.redirect('/')
}

function doDelete(req,res){
    var id=parseInt(req.query.id);
    if(!Music.getById(id)){
        return res.send('musicId not exists')
    }
   // Music.delete(id);
   Music.removeById(id); 
   res.redirect('/')
}

function doAdd(req,res){
    let form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, 'www')
    form.keepExtensions = true
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err
      }
      let title = fields.title
      let singer = fields.singer
      let music = path.basename(files.music.path)
      let poster = path.basename(files.poster.path)
      var m = new Music(title, singer, music, poster)
  
      m.save()
  
      res.redirect('/')
    })
}

function showLogin(req,res){
    res.render('login',{
        'title':'登录页'
    })
}


const users = [
    { username: 'admin', password: '123456' },
    { username: 'aaa', password: '123a' },
    { username: 'aba', password: '123111' },
    { username: 'bbc', password: 'abc123' }
  ]
function doLogin(req,res){
    var username=req.body.username;
    var password=req.body.password;
  //  console.log(req.body)
  //  console.log(username,password)
    
     let user=users.find((u)=>{
        return u.username===username
    }) 
   // let user = users.find(u => u.username === username)
    //console.log(user);
    if(!user){
      return   res.send('user不存在')
    }
    console.log('isgo')
    if(user.password!==password){
        return res.send('密码不正确')
    }
    console.log('isgo22')
    res.redirect('/')

}
export {showIndex,showAdd,showEdit,doEdit,doDelete,doAdd,showLogin,doLogin}
