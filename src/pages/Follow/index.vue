<template>
    <el-container>
    <el-header>
      <HeaderVue></HeaderVue>
    </el-header>
    <el-container>
      <el-aside width="20%">
    <SidebarVue/>
    </el-aside>
    <el-main>
    <div class="container">
      <h3>关注列表</h3>
      <el-button @click="listfollow()">显示关注列表</el-button>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="follow user">
            <el-input style="width=300px" v-model="follow" placeholder="输入用户名以关注"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="followuser()">关注</el-button>
        </el-form-item>
      </el-form>
      <template>
  <el-table
    :data="followlist.filter(data => !search || data.follow.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="用户"
      prop="follow">
    </el-table-column>
    <el-table-column
      label="关注id"
      prop="id">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="Cancel(scope.row)">取消关注</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

    </div>
    </el-main>
    </el-container>
  </el-container>
  </template>
  
  <script>
  import SidebarVue from '@/components/Sidebar.vue';
  import HeaderVue from '@/components/Header.vue';
  import axios from 'axios';
  import { ListFollows,CreateFollow,DeleteFollow } from '@/api';
  export default {
  components:{
    SidebarVue,
    HeaderVue
  },
  data(){
    return{
    search:'',
      filepath:'',
      user:'',
      followlist:[],
      follow:'',
    }
  },
  beforeMount(){
  this.listfollow();
    },
  methods:{
    followuser(){
      const user = sessionStorage.getItem("user")
      CreateFollow(user,this.follow)
          .then(res=>{
            alert('关注成功');
            this.listfollow();
          }).catch(err=>{
            console.log(err)
            alert('服务器未响应')
          })
          },
      listfollow(){
        const user = sessionStorage.getItem("user")
        ListFollows(1,100,user)
            .then(res=>{
            // console.log(res.data);
            this.followlist=JSON.parse(JSON.stringify(res.data.data.getFollowsFrom.data));
            console.log(this.followlist);
            if(res.data!=null){
            console.log('获取成功');
            }
            else{
              alert('文件获取失败')
            }
          }).catch(err=>{
            console.log(err)
            alert('服务器未响应')
          })
  
  },
  Cancel(row){
      DeleteFollow(row.id)
        .then(res=>{
          // console.log(res);
          alert('删除成功');
          this.listfollow();
        }).catch(err=>{
          console.log(err)
          alert('服务器未响应')
        })

    }
    },
  }
  </script>
  
  <style>
  .el-header{
    height:70px;
    background-color: #fff;
  }
  .container{
    height: 100%;
    width: 80%;
  }
  </style>