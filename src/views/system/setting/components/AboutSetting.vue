<template>
  <el-form ref="form" :model="setting">
    <el-form-item prop="content" style="margin-bottom: 30px;">
      <mavonEditor v-model="setting.content" ref="editor" @imgAdd="handleEditorImgAdd" style="height: 500px; z-index: auto;"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {updateAbout, getAbout} from "@/api/system/setting";
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import marked from 'marked'

  export default {
    name: "AboutSetting",
    components: {
      mavonEditor
    },
    async created() {
      getAbout().then(response => {
        this.setting.content =  response.selfDescriptions;
        this.setting.id = response.id
      })
    },
    data() {
      return {
        setting: {
          id: 0,
          content: ""
        },
        // 表单校验
        rules: {
          content: [
            {required: true, message: "网站关于不能为空", trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.setting.htmlContent = marked(this.setting.content)
            console.log(JSON.parse(JSON.stringify(this.setting)))
            updateAbout(JSON.parse(JSON.stringify(this.setting))).then(() => {this.msgSuccess("修改成功");}
            );
          }
        });
      },
      close() {
        this.$store.dispatch("tagsView/delView", this.$route);
        this.$router.push({path: "/index"});
      },
      handleEditorImgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        uploadImgToQiNiu(formdata).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          $vm.$img2Url(pos, url);
        })
      },
    }
  }
</script>

<style scoped>

</style>
