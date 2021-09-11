/*
 * @Description: 审核，未审核切换。有查询面板，并且列表区域可下拉刷新上拉加载
 * @Author:  chessyu
 * @Date: 2021-08-06 18:11:46
 */
let templateParams = {
  type: "default",
  env: "mobile",
  description: "【基本布局】-- 状态切换，有面板查询,列表区域分页加载",
};

let template = `
<!--
 * @Description: ${ process.argv[4] }
 * @Author:  your name 
 * @Date: ${new Date().toLocaleDateString()}
-->
<template>
    <div>
        <ConditionLayout>
            <template #seach>
                <div class="bg-view">
                    <div class="select-status">
                        <span
                        :class="[!reviewStatus ? 'btn-select' : '']"
                        @click="selectReviewed(false)"
                        >未审核</span
                        >
                        <span
                        :class="[reviewStatus ? 'btn-select' : '']"
                        @click="selectReviewed(true)"
                        >已审核</span
                        >
                    </div>
                    <searchPanel
                        showCol="3"
                        :leftInputValue.sync="storeNoFrom"
                        :rightInputValue.sync="billNo"
                        :centerInputValue.sync="center"
                        left-placeholder-text="搜索门店"
                        right-placeholder-text="搜索单号"
                        center-placeholder-text="通知单"
                        :leftStartDate="applyDateStart"
                        :rightEndDate="applyDateEnd"
                        @update:leftStartDate="
                        (val) => {
                            applyDateStart = val;
                        }
                        "
                        @update:rightEndDate="
                        (val) => {
                            applyDateEnd = val;
                        }
                        "
                        between="2"
                        @search="search"
                    ></searchPanel>
                </div>
            </template>

            <template #dataList>
                <VBoxScrollView
        
                :onRefresh="onRefresh"
                :isFinished="isFinished"
                :onUpLoad="onUpLoad"
                >
                    <div v-for="item in 10" style="padding:20px 0; margin: 5px 0; background: #fff;"> {{item}} </div>
                </VBoxScrollView>
            </template>
        </ConditionLayout>
    </div>
</template>

<script>
import ConditionLayout from '@/components/layout/ConditionLayout.vue'
import SearchPanel from "@/components/form/SearchPanel.vue";
import VBoxScrollView from "@/components/VBoxScrollView.vue";
import { getHashParam,getRelativeDate, formatDate } from '@/utils/help.js'

export default {
    components:{
        ConditionLayout,
        SearchPanel,
        VBoxScrollView
    },
    data(){
        return{
            reviewStatus:false,

            storeNoFrom: "",
            billNo: "",
            center:'',
            applyDateStart: "",
            applyDateEnd: "",

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
            console.log({
                storeNoFrom: this.storeNoFrom,
                billNo: this.billNo,
                center:this.center,
                applyDateStart: this.applyDateStart || getRelativeDate(formatDate("yyyy-MM-dd"), "2"),
                applyDateEnd: this.applyDateEnd || formatDate("yyyy-MM-dd"),
            })
        },
        // 下拉刷新
        onRefresh() {
            console.log('下拉刷新');
            this.search();
        },
        //上拉加载
        onUpLoad() {
            console.log('上拉加载')
            if (!this.isFinished) {
                this.page++;
                this.seach();
            }
        },
    }
}
</script>

<style>
    @import url("./index.less");
    
</style>
`;

module.exports = {
  templateParams,
  template,
};
