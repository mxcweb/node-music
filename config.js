import {join} from 'path'
export default{
    port:3000,
    host:'127.0.0.1',
    staticPaths:[
        join(__dirname,'www')
    ]
}