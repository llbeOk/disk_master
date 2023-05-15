import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//准备actions，mutations，state对象
const actions = {
    // countadd(context,value){
    //     console.log('add被调用了')
    //     context.commit('ADD',value)
    // },
    // countminus(context,value){
    //     context.commit('MINUS',value)
    // },
    addOdd(context,value){
        if(context.state.sum % 2){  
            context.commit('ADD',value)
        }
    },
    addWait(context,value){
        setTimeout(()=>{
            context.commit('ADD',value)
        },500)
    },
    userlogin(context,userL){
        context.commit('LOGIN',userL)
    },
    userlogout(context){
        sessionStorage.clear()
        context.commit('LOGOUT')
    }
}
const mutations = {
    LOGIN(state,userL){
        console.log('用户信息已经更新')
        state.user.username=userL.uname
        state.user.password=userL.upassword
        state.user.name=userL.username
        console.log('仓库中',state.user.username)
    },
    LOGOUT(state){
        state.user.username='',
        state.user.password='',
        state.user.name=''
        console.log('用户信息已经清空')
    },
    ADD(state,value){
        console.log('mutation里的add被调用了')
        state.sum+=value
    },
    MINUS(state,value){
        state.sum-=value
    },
    ADDPLAYER(state,value){
        state.playList.unshift({
            id:value.id,
            name:value.name            
        })
    },
}
const state = {
    user:{
        username:'',
        password:'',
        name:''
    },
    sum:0,
    name:'c螺',
    siu:'田螺下饭',
    playList:[
        {
            id:1,
            name:'ikun'
        },
    ]
}
const getters = {
    bigSum(state){
        return state.sum*10
    }
}
//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})


