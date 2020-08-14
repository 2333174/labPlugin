<template>
  <div>
    <button class="dialogbtn close-btn" @click="cancel">
      <i class="el-icon-close" style="font-weight:bold"></i>
    </button>
    <el-card class="argsCard">
      <!-- <dataTree @optionData="this.optionData" /> -->
      <div class="pluginHeader">{{ this.pluginInfo.name }}{{ title }}</div>
      <el-divider />
      <!--调用插件前-->
      <el-form
        class="pluginContent"
        ref="inputForm"
        :model="inputForm"
        label-position="left"
        label-width="150px"
        v-show="!isCreated"
      >
        <el-form-item
          label="阈值"
        >
          <el-input v-model="inputForm.T"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px;text-align:center" v-show="!isCreated">
        <el-button style="width:130px;height:40px" type="primary" @click="callService">提交</el-button>
        <el-button style="width:130px;margin-left:32px;height:40px" plain @click="cancel">取消</el-button>
      </div>
      <!--调用插件后-->
      <div style="text-align:center;margin-top: 20px;" v-show="isCreated">
        <i v-if="isSuccess" class="el-icon-success successIcon" />
        <i v-else class="el-icon-error errorIcon" />
        <div style="margin: 20px auto;">
          <span v-if="isSuccess" class="createTip">任务创建成功</span>
          <span v-else class="createTip">任务创建失败</span>
        </div>
        <!-- <div style="margin: 20px auto; color:#8C8C8C;font-size:14px" v-if="isSuccess">预计xx时间完成</div> -->
        <div class="maskInfo" v-show="isSuccess">
          <div class="infoItem">
            <span class="infoname">数据集名称：</span>
            <span>{{this.datasetInfo.name}}</span>
          </div>
          <div class="infoItem">
            <span class="infoname">操作名称：</span>
            <span>{{pluginInfo.name}}</span>
          </div>
          <div class="infoItem">
            <span class="infoname">创建时间：</span>
            <span>{{time}}</span>
          </div>
        </div>
        <div style="margin: 20px auto; color:#8C8C8C;font-size:14px" v-if="!isSuccess">失败原因：xxxxx</div>
        <div style="margin-top:10px;text-align:center" v-show="isSuccess">
          <el-button style="width:130px;height:40px" type="primary" @click="showProgress">查看任务进度</el-button>
          <el-button style="width:130px;margin-left:32px;height:40px" plain @click="cancel">返回</el-button>
        </div>
        <div style="margin-top:10px;text-align:center" v-show="!isSuccess">
          <el-button style="width:130px;height:40px" type="primary" @click="returnModify">返回修改</el-button>
          <el-button style="width:130px;margin-left:32px;height:40px" plain @click="cancel">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'pluginDialog',
  data () {
    return {
      inputForm: {
        inputFile: '',
        outputFile: '',
        T: ''
      },
      isSuccess: false,
      isCreated: false,
      title: '配置',
      time: '',
      pluginName: '去阴影',
      datasetInfo: {},
      projectId: '',
      pluginInfo: {
        name: '去阴影',
        pluginName: 'ShadowsProportion'
      }
    }
  },
  components: {
  },
  mounted () {
    this.datasetInfo = this.$pluginAPI.getDatasetInfo()
    this.inputForm.inputFile = '{workspace}' + this.datasetInfo.path
    console.log(this.datasetInfo, 'datasetInfo')
  },
  methods: {
    callService () {
      this.$pluginAPI.getNewDatasetPath().then((res) => {
        console.log(res)
        this.inputForm.outputFile = '{workspace}' + res
        this.$axios
          .post(this.$$pluginAPI.getPluginInfoAPI.ShadowsProAddr.url, { inputData: this.inputForm })
          .then((res) => {
            console.log(res.data)
            if (res.data !== 'ERROR') this.isSuccess = true
            this.isCreated = true
            this.time = new Date()
          })
        this.title = ''
      })
    },
    cancel () {
      this.$pluginAPI.closePlugin()
    },
    returnModify () {
      this.isCreated = false
    },
    showProgress () {
    }
  }
}
</script>

<style lang="less">
.createTip {
  font-size: 20px;
  font-weight: bold;
}
.close-btn {
  color: #8d9ea7;
  transition: all 0.2s ease-in;
}
.close-btn:hover {
  color: red;
}
.pluginHeader {
  text-align: center;
  font-weight: bold;
}
.el-divider {
  margin: 10px 0px;
}
.successIcon {
  font-size: 100px;
  color: #34c627;
}
.errorIcon {
  font-size: 100px;
  color: #fd2237;
}
.maskInfo {
  background-color: #fafafa;
  width: 70%;
  margin: 10px auto;
  padding: 5px 0;
  .infoItem {
    padding: 5px;
    font-size: 14px;
    color: #5a5a5a;
  }
}
.dialogbtn {
  position: absolute;
  z-index: 2005;
  right: -20px;
  top: -20px;
  line-height: 1;
  border-radius: 50%;
  padding: 12px;
  background-color: white;
  border: 2px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
  cursor: pointer;
}
.pluginContent {
  width: 80%;
  margin: 20px auto;
}
</style>
