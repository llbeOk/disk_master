<template>
  <el-container id="mainpart">
    <el-header>
      <HeaderVue></HeaderVue>
    </el-header>
    <el-container>
      <el-aside width="20%">
        <SidebarVue />
      </el-aside>
      <el-main>
        <div class="container">
          <h3>我的所有文件</h3>
          <el-button @click="getFile">显示文件</el-button>
          <el-upload
            class="upload-demo"
            action="http://localhost:8080/wangpan/fileupload.do"
            auto-upload
            :limit="1"
            :file-list="fileList"
            :http-request="httpRequest"
            :on-change="onChange"
          >
            <el-button size="medium" type="primary"
              >上传文件<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </el-upload>
          <el-pagination
            @size-change="getFile"
            @current-change="getFile"
            :current-page.sync="currentPage"
            :page-sizes="[5,10, 100, 400]"
            :page-size.sync="pagesize"
            layout="sizes, prev, pager, next"
            :total="1000"
          >
          </el-pagination>
          <el-table :data="filetable" style="width: 100%">
            <el-table-column label="文件名称" prop="filename">
            </el-table-column>
            <el-table-column label="文件类型" prop="filetype">
            </el-table-column>
            <el-table-column label="文件大小" prop="filesize">
            </el-table-column>
            <el-table-column label="上传时间" prop="createdAt">
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入文件名搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="download(scope.row)"
                  >下载</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="fileDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <!-- ---------用于下载链接的dialog ------- -->
    <el-dialog title="文件下载" :visible.sync="dialogVisible" width="30%">
      <span>确定要下载文件{{ loadname }}</span>
      <span>文件大小{{ loadsize / 1024 }}kb</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <a :href="loadapi">下载文件</a>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import SidebarVue from "@/components/Sidebar.vue";
import HeaderVue from "@/components/Header.vue";
import { ListFile, UploadFile, DeleteFile } from "@/api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      search: "",
      filetable: [],
      filepath: "/fileceshi/ceshi.txt",
      loadapi: "",
      loadname: "",
      loadsize: "",
      pagesize:10,
      currentPage:1,
    };
  },
  components: {
    SidebarVue,
    HeaderVue,
  },
  beforeMount() {
    this.getFile();
  },
  methods: {
    getFile() {
      let user = sessionStorage.getItem("user");
      console.log(user);
      //   let data = new FormData()
      //   data.append('username',sessionStorage.getItem('username'))
      //   axios.post("http://localhost:8080/wangpan/listfile.do",data)
      //   .then(res=>{
      //   this.filetable=JSON.parse(JSON.stringify(res.data));
      //   console.log(this.filetable);
      //   if(res.data!=null){
      //   console.log('获取成功');
      //   }
      //   else{
      //     alert('文件获取失败')
      //   }
      // }).catch(err=>{
      //   console.log(err)
      //   alert('服务器未响应')
      // })
      ListFile(this.currentPage, this.pagesize, user).then((res) => {
        this.filetable = JSON.parse(
          JSON.stringify(res.data.data.getFiles.data)
        );
        console.log(this.filetable);
      });
    },
    download(row) {
      this.loadapi = `http://localhost:3000/file/${row.username}/${row.filename}`;
      this.loadname = row.filename;
      this.loadsize = row.filesize;
      this.dialogVisible = true;
    },
    fileDelete(row) {
      DeleteFile(row.id).then((res) => {
        this.getFile();
        alert("删除成功");
      });
    },

    onSuccess(response, file, fileList) {
      console.log("----onSuccess----", response, file, fileList);
      this.$message.success("导入成功");
      this.fileList = []; //清空文件显示列表
      this.$emit("update:visible", false); //关闭文件选择的弹窗
      this.$emit("upload-success"); //触发父组件中方法刷新列表数据
    },
    httpRequest(item) {
      const fd = new FormData();
      fd.append("name", sessionStorage.getItem("user"));
      fd.append("file", item.file);
      UploadFile(fd)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.getFile();
          alert("上传完成");
          console.log(err);
        });
    },
  },
};
</script>

<style>
#mainpart {
  height: 100%;
}
.el-header {
  height: 70px;
  background-color: #fff;
  text-align: center;
  line-height: 35px;
}
.container {
  text-align: left;
  height: 100%;
  width: 80%;
}
</style>