<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>用户信息</span>
    <el-button style="float: right; padding: 3px 0" type="text">
        <router-link to="/file">返回首页</router-link>
    </el-button>
  </div>
  <div  class="text item">
    <ul>
        <li>用户名:{{user.username}}</li>
        <li>密码:{{ user.password}}</li>
        <li>真实姓名{{user.name}}</li>
        <el-button class="changeuser">修改用户信息</el-button>
    </ul>
  </div>
</el-card>
</template>

<script>

export default {
  data(){
    return{
      user:{
        username:'',
        password:'',
        name:''
      },
    }
  },
  beforeMount(){
    this.user.username=sessionStorage.getItem('username')
    this.user.name=sessionStorage.getItem('name')
    this.user.password=sessionStorage.getItem('password')
  }

}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 30px auto;
  }
  .changeuser{
    margin: 30px auto;
  }
</style>