<template>
  <div>
    <span class="info1">早上好,{{username}}</span>
    <span class="info2">基于大数据环境网盘系统</span>
    <span class="userinfo">
        <el-avatar> {{username}}</el-avatar>
        <el-dropdown>
            <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
                <el-dropdown-item>
                    <router-link to="/user">
                        <div class="link">用户中心</div>
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/login" >
                        <div class="link" @click="userlogout()">登出</div>
                    </router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </span>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
      return{
        username:''
      }
    },
    beforeMount(){
      this.username=sessionStorage.getItem('user');
    },
    methods:{
    ...mapActions({userlogout:'userlogout'})
  }

}
</script>

<style>
.info1{
    float: left;
}
.info2{
    margin-right:100px;
    color: cadetblue;
    font-size:medium;
}
.userinfo{
    float: right;
}
.link{
    color:black;
    text-align: center;
    height: 30px;
    line-height: 15px;
}
</style>