<template>
  <div class="body">
  <div class="card">
    <h1>网盘系统</h1>
    <h2>基于hadoop和hbase环境</h2>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>网盘用户登录</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">用户注册</el-button>
  </div>
  <div class="login">
    <div class="input">
      <span class="info">用户名</span>
      <el-input v-model="user.username" placeholder="请输入用户名" style="width:200px" prefix-icon="el-icon-user"></el-input>
    </div>
    <div class="input">
      <span class="info">密码</span>
      <el-input placeholder="请输入密码" v-model="user.password" show-password style="width:200px" prefix-icon="el-icon-lock"></el-input>
    </div>
    <div class="button">
      <el-button style="width:100px" @click="login">登录</el-button>
    </div>
  </div>
</el-card>
  </div>
  <el-dialog title="注册用户" :visible.sync="dialogFormVisible">
  <el-form :model="newuser">
    <el-form-item label="用户名" >
      <el-input v-model="newuser.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" >
      <el-input v-model="newuser.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" >
      <el-input v-model="newuser.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" >
      <el-input v-model="newuser.check" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="checkpass()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Login,Register } from '@/api';
export default {
  data(){
    return{
      user:{
      username:'',
      password:'',
      },
      dialogFormVisible:false,
      newuser:{
        username:'',
        password:'',
        check:'',
        name:''
      }
    }
  },
  methods:{
    ...mapActions({userlogin:'userlogin'}),
    checkpass(){
      if(this.newuser.password==this.newuser.check){
        this.register();
      }
      else{
        alert('两次密码输入不一致')
      }
    },
    login(){
      Login(this.user.username,this.user.password).then((res)=>{
        console.log(res);
        if(res.data.data.login.code===200){
          alert('登录成功')
          sessionStorage.setItem('user',this.user.username)
          this.$router.push('/file')
        }
        else{
          alert(res.data.data.login.message)
        }
      })
    },
    register(){
      this.dialogFormVisible = false
      Register(this.newuser.username,this.newuser.password).then((res)=>{
        console.log(res);
          alert(res.data.data.register.message)
      })
    }
  }
}
</script>

<style>
  .card{
    height: 300px;
    width:500px;
    margin: 100px auto;
  }
  .login{
    text-align: left;
  }
  .input{
    text-align: left;
    margin: 20px 10px;
  }
  .info{
    width: 80px;
    display: inline-block;
  }
  .button{
    width:100px;
    margin: auto auto;
  }
</style>