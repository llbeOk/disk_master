import requests from "./request";
export const Login = (name, password) => {
  return requests({
    url: '/graphql',
    method: 'post',
    data: { "operationName": "login", 
            "variables": { "name": name, "password": password}, 
            "query": "mutation login($name: String!, $password: String!) {\n  login(name: $name, password: $password) {\n    code\n    message\n    data\n  }\n}\n" 
          }
  })
}
export const Register = (name, password) => {
  return requests({
    url: '/graphql',
    method: 'post',
    data: { "operationName": "register", 
            "variables": { "name": name, "password": password}, 
            "query": "mutation register($name: String!, $password: String!) {\n  register(name: $name, password: $password) {\n    code\n    message\n    data\n  }\n}\n" 
          }
  })
}
export const ListFile = (page,pagesize,user)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getFiles",
           "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user},
           "query":"query getFiles($page: PageInput!, $user: String!, $name: String) {\n  getFiles(page: $page, user: $user, name: $name) {\n    code\n    data {\n      id\n      filepath\n      filename\n      filesize\n      filetype\n      createdAt\n  username   }\n    message\n  }\n}\n"
          }
  })
}
export const ListFileByType = (page,pagesize,user,type)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getFiles",
           "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user,"type":type},
           "query":"query getFiles($page: PageInput!, $user: String!, $name: String, $type: String) {\n  getFiles(page: $page, user: $user, name: $name, type: $type) {\n    code\n    data {\n      id\n      filepath\n      filename\n      filesize\n      filetype\n      createdAt\n      username\n    }\n    message\n  }\n}\n"
          }
  })
}
export const ListFileByName = (page,pagesize,user,name)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getFiles",
           "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user,"name":name},
           "query":"query getFiles($page: PageInput!, $user: String!, $name: String) {\n  getFiles(page: $page, user: $user, name: $name) {\n    code\n    data {\n      id\n      filepath\n      filename\n      filesize\n      filetype\n      createdAt\n    }\n    message\n  }\n}\n"
          
          }
  })
}
export const UploadFile = (fd) => {
  return requests({
    url: '/file/upload',
    method: 'post',
    responseType: 'blob',
    data:fd
  })
}
export const DeleteFile = (id)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"delFile",
           "variables":{"id":id},
           "query":"mutation delFile($id: String!) {\n  delFile(id: $id)\n}\n"
          }
  })
}
export const ListShareByFrom = (page,pagesize,user)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getSharesFrom",
          "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user},
          "query":"query getSharesFrom($page: PageInput!, $user: String!) {\n  getSharesFrom(page: $page, user: $user) {\n    code\n    message\n    data {\n      id\n      fromuser\n      touser\n      filename\n      filetype\n      filesize\n    }\n  }\n}\n"
          }
})
}
export const ListShareByTo = (page,pagesize,user)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getSharesTo",
          "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user},
          "query":"query getSharesTo($page: PageInput!, $user: String!) {\n  getSharesTo(page: $page, user: $user) {\n    code\n    message\n    data {\n      id\n      fromuser\n      touser\n      filename\n      filetype\n      filesize\n    }\n  }\n}\n"
          }
})
}
export const CreateShare = (user,follow,filename,filetype,filesize)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"createShare",
           "variables":{"params":{"fromuser":user,"touser":follow,"filename":filename,"filetype":filetype,"filesize":filesize}},
           "query":"mutation createShare($params: ShareInput!) {\n  createShare(params: $params)\n}\n"
          }
})
}
export const CreateFollow = (user,follow)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"createFollow",
           "variables":{"params":{"user":user,"follow":follow}},
           "query":"mutation createFollow($params: FollowInput!) {\n  createFollow(params: $params)\n}\n"
          }
})
}
export const ListFollows = (page,pagesize,user)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"getFollowsFrom",
           "variables":{"page":{"pageNum":page,"pageSize":pagesize},"user":user},
           "query":"query getFollowsFrom($page: PageInput!, $user: String!) {\n  getFollowsFrom(page: $page, user: $user) {\n    code\n    message\n    data {\n      id\n      user\n      follow\n    }\n  }\n}\n"
          }
})
}
export const DeleteShare = (id)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"delShare",
           "variables":{"id":id},
           "query":"mutation delShare($id: String!) {\n  delShare(id: $id)\n}\n"
          }
  })
}
export const DeleteFollow = (id)=>{
  return requests({
    url: '/graphql',
    method: 'post',
    data: {"operationName":"delFollow",
           "variables":{"id":id},
           "query":"mutation delFollow($id: String!) {\n  delFollow(id: $id)\n}\n"
          }
  })
}