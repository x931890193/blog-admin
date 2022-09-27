<template>
  <el-form ref="form" :model="setting" :rules="rules" label-width="300px">
    <el-form-item label="网站名称" prop="title">
      <el-input v-model="setting.title" style="width: 60%;" placeholder="请输入网站名称"/>
    </el-form-item>
    <el-form-item label="网站备案号" prop="beian">
      <el-input v-model="setting.beian" style="width: 60%;" placeholder="请输入网站备案号"/>
    </el-form-item>
    <el-form-item label="网站描述" prop="descriptions">
      <el-input v-model="setting.descriptions" style="width: 60%;" placeholder="请输入网站描述"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {updateSiteSetting, getSiteSetting} from "@/api/system/setting";

  export default {
    name: "SiteSetting",
    data() {
      return {
        setting: {
          id: 0,
          title: "",
          beian: "",
          descriptions: ""
        },
        // 表单校验
        rules: {
          title: [
            {required: true, message: "网站名不能为空", trigger: "blur"}
          ],
          beian: [
            {required: true, message: "网站备案号不能为空", trigger: "blur"}
          ],
          descriptions: [
            {required: true, message: "网站描述不能为空", trigger: "blur"}
          ]
        }
      }
    },
    async created() {
      getSiteSetting().then(response => {
        this.setting.id = response.id
        this.setting.title = response.title
        this.setting.beian = response.beian
        this.setting.descriptions = response.descriptions
      })
    },
    methods: {
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            updateSiteSetting(JSON.parse(JSON.stringify(this.setting))).then(() => {this.msgSuccess("修改成功")})
          }
        });
      },
      close() {
        this.$store.dispatch("tagsView/delView", this.$route);
        this.$router.push({path: "/index"});
      }
    }

  }
</script>

<style scoped>

</style>
