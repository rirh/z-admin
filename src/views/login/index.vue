<template>
  <div class="login-container">
    <el-form
      v-if="state == 0"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >
      <div style="position: relative">
        <div class="tips">
          <span>Power by TigerZH </span>
          <span>{{ time }}</span>
        </div>

        <el-button size="small" class="thirdparty-button" @click="toRegister">
          免费注册
        </el-button>
      </div>
    </el-form>
    <el-form
      v-else
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="nested" />
        </span>
        <el-input
          ref="dyhCode"
          v-model="dyhCode"
          type="text"
          placeholder="邀请码"
          name="dyhCode"
          tabindex="2"
          auto-complete="on"
        />
        <el-popover
          placement="left-start"
          trigger="hover"
          title="扫码关注发送'邀请码'获取"
        >
          <img
            class="right-img"
            style="width: 200px; height: 200px"
            :src="dyhUrl"
          />
          <el-button slot="reference" class="right-btn show-pwd">
            <div class="right-item">
              <span class="show-pwd"> 获取邀请码 </span>
            </div>
          </el-button>
        </el-popover>
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phoneNum"
          v-model="phoneNum"
          placeholder="邮箱/手机号"
          name="phoneNum"
          type="text"
          tabindex="1"
          auto-complete="on"
          @input="onPhoneNumChange"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="link" />
        </span>
        <el-input
          ref="code"
          v-model="code"
          type="text"
          placeholder="验证码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span v-if="!showGetCode" class="show-pwd"> 获取验证码 </span>
        <span
          v-if="showGetCode && !showTimeCount"
          class="show-pwd"
          style="color: #333; font-weight: bold"
          @click="showCode"
        >
          获取验证码
        </span>
        <span v-if="showGetCode && showTimeCount" class="show-pwd">
          {{ timeNum }}
        </span>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="startReg"
        >注 册</el-button
      >

      <div style="position: relative">
        <div class="tips">
          <span>Power by TigerZH </span>
          <span>{{ time }}</span>
        </div>

        <el-button size="small" class="thirdparty-button" @click="toLogin">
          立即登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validPhoneNum, validEmail } from "@/utils/validate";
import { sendSmsCode, verifyCode, register, iso } from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (this.state === 0) {
        if (!validPhoneNum(value) || validEmail(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (this.state === 0) {
        if (value.length < 6) {
          callback(new Error("密码至少6个字符"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      state: 0,
      showGetCode: false,
      showTimeCount: false,
      timeNum: 60,
      phoneNum: "",
      code: "",
      password: "",
      dyhCode: "",
      time: "",
      dyhUrl:
        "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-vou8sjcjysto19584c/caee8840-27eb-11eb-8a36-ebb87efcf8c0.jpg",
    };
  },
  async mounted() {
    const result = await iso({
      name: "iso",
    });
    this.time = result.iso;
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      if (this.loginForm.username === "admin") {
        this.loading = true;
        this.$store
          .dispatch("user/adminLogin", this.loginForm)
          .then(() => {
            this.$router.push({ path: "/admin/adminDashboard" });
            this.loading = false;
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      } else {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              })
              .catch((e) => {
                console.log(e);
                this.loading = false;
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    startReg() {
      if (!/^1\d{10}$/.test(this.phoneNum)) {
        this.$message.error("手机号码格式不正确");
        return false;
      }
      if (this.code.length !== 6) {
        this.$message.error("验证码不正确");
        return false;
      }
      if (this.password.length < 6) {
        this.$message.error("密码至少6位");
        return false;
      }
      const req = {
        mobile: this.phoneNum,
        code: this.code,
        type: "register",
      };
      verifyCode(req).then((response) => {
        if (response.code === 0) {
          const req2 = {
            username: this.phoneNum,
            password: this.password,
            role: [3],
          };
          register(req2).then((res) => {
            if (res.code === 0) {
              console.log(res);
              this.$message({
                message: "恭喜你，注册成功",
                type: "success",
              });
              this.phoneNum = "";
              this.password = "";
              this.code = "";
              this.showGetCode = false;
              this.showTimeCount = false;
              this.state = 0;
            }
          });
        }
      });
    },
    toRegister() {
      this.state = 1;
    },
    toLogin() {
      this.state = 0;
    },
    onPhoneNumChange(v) {
      if (!validPhoneNum(v) || !validEmail(v)) {
        this.showGetCode = true;
      } else {
        this.showGetCode = false;
      }
    },
    showCode() {
      const req = {
        email: this.phoneNum,
        type: "sendEmailCode",
        name: "user-center",
        role: [3],
        my_invite_code: this.dyhCode,
      };
      sendSmsCode(req).then(({ code, message }) => {
        if (!code) {
          this.$message({
            message: "验证码已发送",
            type: "success",
          });
          this.showTimeCount = true;
          var that = this;
          var timeClock = setInterval(function () {
            that.timeNum = that.timeNum - 1;
            if (that.timeNum === 0) {
              that.showTimeCount = false;
              clearInterval(timeClock);
            }
          }, 1000);
        } else {
          this.$message.error(message);
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$cursor: #333;
$dark_gray: #333;
$light_gray: #333;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  background-image: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-vou8sjcjysto19584c/21daee90-258b-11eb-b997-9918a5dda011.jpg);
  @media only screen and (max-width: 750px) {
    background-position: right;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // &:-webkit-autofill {
      // box-shadow: 0 0 0px 1000px #fff inset !important;
      // -webkit-text-fill-color: #fff !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #333;
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin-left: calc(100vw - (520px + 4%));
    overflow: hidden;
    padding: 20px 35px;
    margin-top: 160px;
    background-color: white;
    border-radius: 10px;
    opacity: 0.9;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    @media only screen and (max-width: 750px) {
      width: 90vw;
      margin-left: 5vw;
      background-color: #f4f4f4;
      opacity: 0.98;
      box-shadow: 3px 6px 6px -2px rgba(0, 0, 0, 0.2),
        3px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    }
  }

  .tips {
    font-size: 12px;
    color: #666;
    // margin-bottom: 10px;
    @media only screen and (max-width: 750px) {
      font-size: 10px;
      display: flex;
      flex-direction: column;
      // line-height: 15px;
      align-items: flex-start;
      justify-content: flex-end;
      height: 100%;
    }

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: -8px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .right-btn {
    width: 100px;
    border: 0px;
    top: 11px;
    right: 0px;
    opacity: 0.85;
    background-color: transparent;
  }
}
</style>
