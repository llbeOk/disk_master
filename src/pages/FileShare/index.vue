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
    <h3>我的分享</h3>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="文件名">
      <el-select v-model="file" placeholder="请选择要分享的文件">
    <el-option
      v-for="item in filelist"
      :key="item.id"
      :label="item.filename"
      :value="item">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="touser">
    <el-select v-model="touser" placeholder="请选择要分享的用户">
    <el-option
      v-for="item in followlist"
      :key="item.id"
      :label="item.follow"
      :value="item.follow">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="share()">分享</el-button>
  </el-form-item>
</el-form>
    <el-button @click="listMyshare()">显示我的分享</el-button>
    <template>
  <el-table
    :data="sharelist.filter(data => !search || data.filename.toLowerCase().includes(search.toLowerCase()))"
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
      label="分享给"
      prop="touser">
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
          @click="Cancel(scope.row)">取消分享</el-button>
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
import { ListFile ,ListShareByFrom,DeleteShare,ListFollows,CreateShare} from '@/api';
export default {
components:{
  SidebarVue,
  HeaderVue
},
data(){
  return{
    search:'',
    file:'',
    touser:'',
    sharelist:[],
    filelist:[],
    path:[],
    followlist:[],
    follow:[],
    timeout:null,
  }
},
beforeMount(){
  this.listMyshare();
  this.getFile();
  this.listfollow();
},
methods:{
       getFile(){
        let user = sessionStorage.getItem('user')
        ListFile(1,100,user)
          .then(res=>{
          this.filelist=JSON.parse(JSON.stringify(res.data.data.getFiles.data));
          console.log(this.filelist);
          this.path=this.filelist.map((item)=>{
              return{
                value:item.filename
              }
          })
          console.log('path',this.path)
          if(res.data!=null){
          // console.log('获取成功');
          }
          else{
            alert('文件获取失败')
          }
        }).catch(err=>{
          console.log(err)
          // alert('服务器未响应')
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
        querySearch(queryString, cb) {
        var path = this.path;
        var results = queryString ? path.filter(this.createFilter(queryString)) : path;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString) {
        return (path) => {
          return (path.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
  share(){
    console.log(this.file)
    console.log(this.touser)
    const user = sessionStorage.getItem('user')
    CreateShare(user,this.touser,this.file.filename,this.file.filetype,this.file.filesize)
        .then(()=>{
          // console.log(res);
          alert('分享成功');
          this.listMyshare();
         
        }).catch(err=>{
          console.log(err)
          alert('服务器未响应')
        })
        },
    listMyshare(){
          ListShareByFrom(1,100,sessionStorage.getItem('user'))
          .then(res=>{
          // console.log(res.data);
          this.sharelist=JSON.parse(JSON.stringify(res.data.data.getSharesFrom.data));
            console.log(this.sharelist);
          if(res.data!=null){
          // console.log('获取成功');
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
        DeleteShare(row.id)
        .then(res=>{
          alert('取消分享成功');
          this.listMyshare();
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