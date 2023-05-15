<template>
    <div class="side" width="20%">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <el-menu-item>
        <template slot="title">
          <router-link to="/file" style="text-decoration:none;color: black;">
          <i class="el-icon-folder"></i>
          <span>我的文件</span>
        </router-link>
        </template>
    </el-menu-item>
      <el-menu-item>
        <template slot="title">
          <router-link to="/follow" style="text-decoration:none;color: black;">
          <i class="el-icon-connection"></i>
          <span>关注列表</span>
        </router-link>
        </template>
    </el-menu-item>
        <el-menu-item>
        <template slot="title">
          <router-link to="/share" style="text-decoration:none;color: black;">
          <i class="el-icon-s-promotion"></i>
          <span>文件分享</span>
        </router-link>
        </template>
    </el-menu-item>
    <el-menu-item>
        <template slot="title">
          <router-link to="/shared" style="text-decoration:none;color: black;">
          <i class="el-icon-link"></i>
          <span>接收分享</span>
        </router-link>
        </template>
    </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    methods: {
      
    }
}
</script>

<style>
.side{
  height: 600px;
  overflow-y: hidden;
  overflow-x:hidden;
}
</style>