<template>
  <div>
    <input v-model="params.keyword"/>
    <button @click="look">显示search</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      params:{keyword:''},
      search: {},
    };
  },
  mounted() {
    // axios
    //   .post("http://gmall-h5-api.atguigu.cn/api/list", {})
    //   .then((response) => {
    //     console.log(response.data);
    //     this.search = response.data.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios(
        {
            url:'http://gmall-h5-api.atguigu.cn/api/list',
            method:'post',
            data:this.params
        }
    ).then((response)=>{
        console.log(response.data);
        this.search = response.data.data;
    })
    .catch((err)=>{
        console.log(err);
    })
  },
  methods: {
    look() {
      console.log(this.search);
    },
  },
};
</script>

<style>
</style>