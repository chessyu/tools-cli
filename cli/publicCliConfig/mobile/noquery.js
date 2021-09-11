/*
 * @Description: 审核，未审核切换。无查询面板，并且列表区域可下拉刷新上拉加载
 * @Author:  chessyu
 * @Date: 2021-08-12 13:42:33
 */

let templateParams = {
  type: "noquery",
  env: "mobile",
  description: "【基本布局】-- 状态切换，无查询面板,列表区域有分页加载",
};

let template = `

<!--
 * @Description: ${ process.argv[4] }
 * @Author:  your name 
 * @Date: ${new Date().toLocaleDateString()}
-->
<template>
    <div>
        <CheckColumLayout>
            <template #seach>
                <div class="bg-view">
                    <div class="select-status">
                        <span
                            :class="[!reviewStatus ? 'btn-select' : '']"
                            @click="selectReviewed(false)"
                            >未审核</span>
                        <span
                            :class="[reviewStatus ? 'btn-select' : '']"
                            @click="selectReviewed(true)"
                            >已审核</span
                        >
                    </div>
                </div>
            </template>
            <template #dataList>
                <VBoxScrollView
                    :onRefresh="onRefresh"
                    :isFinished="isFinished"
                    :onUpLoad="onUpLoad"
                    rollerColor="#fff"
                >
                    
                    <div v-for="item in 20" style="padding:20px 0; margin: 0 0 10px 0; background: #fff;"> {{item}} </div>
                </VBoxScrollView>
            </template>
        </CheckColumLayout>
    </div>
</template>

<script>
import CheckColumLayout from '@/components/layout/CheckColumLayout.vue'
import VBoxScrollView from "@/components/VBoxScrollView.vue";
import { getHashParam  } from '@/utils/help.js'


export default {
    components:{
        CheckColumLayout,
        VBoxScrollView,
    },
    data(){
        return{
            reviewStatus:false,

            isFinished:false, //下拉加载无更多状态
            
        }
    },
    mounted(){
        this.initUserId();
    },
    methods:{
        // 初始化USERID
        initUserId(){
            let  userId  = getHashParam('userId');
            this.userId = window.userId ?? userId;
        },
        // 状态切换
        selectReviewed(type){
            this.reviewStatus = type;
            
        },
        
        // 查询
        search(){
            console.log('查询')
        },
        // 下拉刷新
        onRefresh() {
            console.log('下拉刷新')
        },
        //上拉加载
        onUpLoad() {
            console.log('上拉加载')
        },
    }
}
</script>

<style scoped>
@import url("./index.less");
.reviewed-view >>> .md-scroll-view-refresh .refresh-tip{
    color:#fff !important;
}
</style>

`;

module.exports = {
  templateParams,
  template,
};
