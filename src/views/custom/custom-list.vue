<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickName"
        placeholder="请输入昵称"
        style="width: 300px"
        class="filter-item"
        @keyup.native.enter="fetchList"
      />
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.startDate"
          type="date"
          placeholder="注册开始日期"
        />
      </div>
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.endDate"
          type="date"
          placeholder="注册结束日期"
        />
      </div>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
    </div>
    <SimpleTable :list-loading="listLoading" :data="list" :columns="columns">
      <el-table-column
        label="操作"
        align="center"
        width="150px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleedit(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleremove(row)"
          />
        </template>
      </el-table-column>
    </SimpleTable>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchList"
    />
    <el-dialog title="编辑" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="绑定邮箱" :label-width="formLabelWidth">
          <div v-if="!form.email_confirmed" class="inline-form">
            <el-input v-model="form.email" autocomplete="off" />
            <el-button @click="handleBindEmail">绑定</el-button>
          </div>
          <div v-else class="inline-form">
            <span>{{ form.email }}</span>
            <el-button @click="handleUnBindEmail">解绑</el-button>
          </div>
        </el-form-item>
        <el-form-item label="绑定手机" :label-width="formLabelWidth">
          <div v-if="!form.mobile_confirmed" class="inline-form">
            <el-input v-model="form.mobile" autocomplete="off" />
            <el-button @click="handleBindMobile">绑定</el-button>
          </div>
          <div v-else class="inline-form">
            <span>{{ form.mobile }}</span>
            <el-button @click="handleUnBindMobile">解绑</el-button>
          </div>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.gender" :label="1">男</el-radio>
          <el-radio v-model="form.gender" :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="邀请码" :label-width="formLabelWidth">
          <div class="inline-form">
            <strong>{{ form.my_invite_code }}</strong>
            <el-button
              v-clipboard:copy="
                `http://join.huzhihui.org.cn?my_invite_code=${form.my_invite_code}`
              "
              v-clipboard:success="clipboardSuccess"
              size="small"
              >复制链接</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <div
            id="qrcode"
            ref="qrcode"
            class="inline-form"
            style="justify-content: center"
            @click="share"
          />
        </el-form-item>
        <el-form-item label="个性签名" :label-width="formLabelWidth">
          {{ form.signature }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import SimpleTable from "@/components/SimpleTable";
import Pagination from "@/components/Pagination";
import {
  getUserList,
  DeleteUser,
  bindMobile,
  bindEmail,
  unbindMobile,
  unbindEmail,
  updateUser,
} from "@/api/custom";
import QRCode from "qrcodejs2";
import clipboard from "@/directive/clipboard/index.js"; // use clipboard by v-directive

export default {
  name: "CustomList",
  components: { SimpleTable, Pagination },
  directives: { waves, clipboard },
  data() {
    return {
      list: [],
      total: 0,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      listLoading: true,
      listQuery: {
        page: 0,
        pageSize: 10,
        nickName: "",
        name: "user-center",
        action: "queryUser",
        startDate: "",
        endDate: "",
      },
      columns: [
        { header: "序号", type: "index", width: "50px", dataIndex: "" },
        {
          header: "账户",
          type: "data",
          width: "240px",
          dataIndex: "username",
        },
        {
          header: "昵称",
          type: "data",
          width: "80px",
          dataIndex: "nickName",
        },
        {
          header: "性别",
          type: "data",
          width: "80px",
          dataIndex: "gender",
        },
        {
          header: "邀请码",
          type: "data",
          width: "75px",
          dataIndex: "my_invite_code",
        },
        {
          header: "权限",
          type: "data",
          width: "50",
          dataIndex: "role",
        },
        {
          header: "最后一次登录IP",
          type: "data",
          width: "120px",
          dataIndex: "last_login_ip",
        },
        {
          header: "最后一次登录时间",
          type: "datetime",
          width: "",
          dataIndex: "last_login_date",
        },
        {
          header: "注册时间",
          type: "datetime",
          width: "",
          dataIndex: "register_date",
        },
      ],
    };
  },
  created: function () {
    this.fetchList();
  },

  methods: {
    handleUpdateUser() {
      updateUser({
        name: "user-center",
        action: "updateUser",
        uid: this.form._id,
        nickName: this.form.nickName,
        gender: this.form.gender,
      }).then(({ msg }) => {
        this.dialogFormVisible = false;
        this.$message({
          message: msg,
          type: "success",
          duration: 1500,
        });
      });
    },
    handleUnBindEmail() {
      unbindEmail({
        name: "user-center",
        action: "unbindEmail",
        uid: this.form._id,
        email: this.form.email,
      }).then(({ msg }) => {
        this.form.email_confirmed = 0;
        this.$message({
          message: msg,
          type: "success",
          duration: 1500,
        });
      });
    },
    handleUnBindMobile() {
      unbindMobile({
        name: "user-center",
        action: "unbindMobile",
        uid: this.form._id,
        mobile: this.form.mobile,
      }).then(({ msg }) => {
        this.form.mobile_confirmed = 0;
        this.$message({
          message: msg,
          type: "success",
          duration: 1500,
        });
      });
    },
    handleBindEmail() {
      bindEmail({
        name: "user-center",
        action: "bindEmail",
        uid: this.form._id,
        email: this.form.email,
      }).then(({ msg }) => {
        this.form.email_confirmed = 1;
        this.$message({
          message: msg,
          type: "success",
          duration: 1500,
        });
      });
    },
    handleBindMobile() {
      bindMobile({
        name: "user-center",
        action: "bindMobile",
        uid: this.form._id,
        mobile: this.form.mobile,
      }).then(({ msg }) => {
        this.form.mobile_confirmed = 1;

        this.$message({
          message: msg,
          type: "success",
          duration: 1500,
        });
      });
    },
    clipboardSuccess() {
      this.$message({
        message: "已复制",
        type: "success",
        duration: 1500,
      });
    },
    handleedit(row) {
      this.dialogFormVisible = true;
      this.form = row;
      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = "";

        new QRCode("qrcode", {
          width: 200, // 设置宽度，单位像素
          height: 200, // 设置高度，单位像素
          text: `http://join.huzhihui.org.cn?my_invite_code=${row.my_invite_code}`, // 设置二维码内容或跳转地址
        });
      });
    },
    share() {
      var oQrcode = document
        .querySelector("#qrcode")
        .getElementsByTagName("canvas");
      const a = document.createElement("a");
      a.href = oQrcode[0].toDataURL("image/png");
      a.download = `${this.form.username}的邀请码`;
      a.click();
      this.$message({
        message: "正在下载",
        type: "success",
        duration: 1500,
      });
    },
    handleremove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await DeleteUser({
            name: "user-center",
            action: "deleteUser",
            uid: row._id,
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fetchList() {
      this.listLoading = true;
      console.log(this.listQuery);

      getUserList(this.listQuery).then((response) => {
        console.log(response);
        this.list = response.data.data;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchList();
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin-left: 10px;
  }
}
</style>
