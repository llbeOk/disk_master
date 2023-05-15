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
      <h3>我收到的分享</h3>
      <el-button @click="listshare()">显示我的分享</el-button>
      <template>
  <el-table
    :data="sharelist.filter(data => !search || data.filepath.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="文件名"
      prop="filename">
    </el-table-column>
    <el-table-column
      label="文件类型"
      prop="filetype">
    </el-table-column>
    <el-table-column
      label="文件大小"
      prop="filesize">
    </el-table-column>
    <el-table-column
      label="分享自"
      prop="fromuser">
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
          @click="transmit(scope.row)">转发</el-button><el-button
          size="mini"
          @click="download(scope.row)">下载</el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="Cancel(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="文件下载"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span>确定要下载 {{loadapi }}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <a :href=loadapi>确定下载</a>
  </span>
</el-dialog>
  <el-dialog
  title="文件转发"
  :visible.sync="dialogVisible2"
  width="30%"
  >
  <h4>文件名:{{ file.filename }}</h4>
  <h4>文件类型:{{ file.filename }}</h4>
  <h4>文件大小:{{ file.filename }}</h4>
  <h4>分享自:{{ file.fromuser }}</h4>
  <el-select v-model="user" placeholder="请选择要分享的用户">
    <el-option
      v-for="item in followlist"
      :key="item.folllowid"
      :label="item.follow"
      :value="item.follow">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button @click="share()">确认并转发</el-button>
  </span>
</el-dialog>
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
  import { ListShareByTo,CreateShare,ListFollows,DeleteShare } from '@/api';
  export default {
  components:{
    SidebarVue,
    HeaderVue
  },
  data(){
    return{
      dialogVisible:false,
      dialogVisible2:false,
    search:'',
      file:'',
      user:'',
      fromuser:'',
      sharelist:[],
      followlist:[],
    }
  },
  beforeMount(){
  this.listshare();
  this.listfollow();
    },
  methods:{
    transmit(row){
      this.file=row
      console.log(this.file);
      this.dialogVisible2=true
    },
    download(row){
          this.loadapi=`http://localhost:8080/wangpan/loadfile.do?filepath=${row.filepath}`
          console.log(this.loadapi)
          this.dialogVisible=true
        },
        listfollow(){
          const user = sessionStorage.getItem("user")
          ListFollows(1,100,user)
            .then(res=>{
            // console.log(res.data);
            this.followlist=JSON.parse(JSON.stringify(res.data.data.getFollowsFrom.data));
          }).catch(err=>{
            console.log(err)
            alert('服务器未响应')
          })
  
        },
    share(){
      CreateShare(this.file.fromuser,this.user,this.file.filename,this.file.filetype,this.file.filesize)
          .then(res=>{
            console.log(res);
            alert('转发成功');
          }).catch(err=>{
            console.log(err)
            alert('服务器未响应')
          })
          },
      listshare(){
        ListShareByTo(1,100,sessionStorage.getItem('user'))
            .then(res=>{
            // console.log(res.data);
            this.sharelist=JSON.parse(JSON.stringify(res.data.data.getSharesTo.data));
            // console.log(this.sharelist);
          }).catch(err=>{
            console.log(err)
            alert('服务器未响应')
          })
  
  },
  Cancel(row){
    DeleteShare(row.id)
        .then(()=>{
          alert('取消分享成功');
          this.listshare();
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