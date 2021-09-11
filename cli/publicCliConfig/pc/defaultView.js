/*
 * @Description: 基础布局模版 --- PC 端页面
 * @Author:  chessyu
 * @Date: 2021-08-07 15:43:02
 */
let templateParams = {
  type: "defaultView",
  env: "pc",
  description: "【基本布局】-- 表头，查询条件，表格区 ( PC )",
};

let template = `
<!--
 * @Description: ${ process.argv[4] }
 * @Author:  your name 
 * @Date: ${new Date().toLocaleDateString()}
-->
<template>
    <div v-if="!mobile">
        <BaseSeachLayout>
            <template #title>
                <div class="pc-title-sty">
                    退货通知单
                </div>
            </template>

            <template #seach>

                <el-form  :inline="true" :model="formInline" :rules="rules" ref="seachForm" class="pc-form-inline" >
                    <el-row >
                        <el-col :span="8">
                            <el-form-item class="pc-form-item" prop="cargoNo" label="货管单位">
                                <el-input v-model="formInline.cargoNo" placeholder="货管单位" class="pc-el-width" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  class="pc-form-item" prop="mechanism" label="机构">
                                <el-select v-model="formInline.mechanism" placeholder="选择机构"  class="pc-el-width" >
                                    <el-option label="机构A" value="shanghai"></el-option>
                                    <el-option label="机构B" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  class="pc-form-item" prop="product" label="商品">
                                <el-input v-model="formInline.product" placeholder="输入商品编码"  class="pc-el-width" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="8">
                            <el-form-item  class="pc-form-item" prop="date" label="验收日期">
                                <el-date-picker
                                    class="pc-el-width" 
                                    v-model="formInline.date"
                                    type="daterange"
                                    align="center"
                                    unlink-panels
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  class="pc-form-item">
                                <el-button style="float:left;" type="primary" round @click="onSubmit">查询</el-button>
                                <el-button style="float:left;" type="primary" plain round @click="onReset('seachForm')">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <template #dataList>
                <el-table
                    :data="tableData"
                    border
                    height="100%"
                    class="pc-block-radiu"
                    :header-row-class-name="headerRowClass"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="商品编码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="大类"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="性别">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="到货数量">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="实物存">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="可配存">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="仓库">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="货管单位">
                    </el-table-column>
                </el-table>
            </template>
        </BaseSeachLayout>
    </div>
</template>

<script>
import BaseSeachLayout from '@/components/layout/BaseSeachLayout.vue'
import { isMobile, getHashParam  } from '@/utils/help.js'

export default {
    components:{
        BaseSeachLayout,
    },
    beforeRouteEnter(to, from, next) {
        if(isMobile()){
            next((vm) => { 
                vm.$router.replace({name:'distrNoticeMobile',query:vm.$route.query,replace: true})
            })
        }else{
            next();
        }
    },
    
    data(){
        return {
            formInline: {
                cargoNo: '',
                mechanism: '',
                product:'',
                date:''
            },
            rules:{},
            mobile: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    mounted() {
        this.mobile = isMobile();
        if(!isMobile()){
            this.initUserId();
        }
    },
    methods: {
        //查询
        onSubmit() {
            console.log('submit!');
        },
        //重置
        onReset(form){
            this.$refs[form].resetFields();
        },
        // 初始化USERID
        initUserId(){
            let  userId  = getHashParam('userId');
            this.userId = window.userId ?? userId;
        },
        //表头自定义背景色
        headerRowClass({row, rowIndex}){
            return 'pc-table-header-class-name';
        }
        
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
