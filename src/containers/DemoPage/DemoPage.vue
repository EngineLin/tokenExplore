<script>
import Signin from '../../components/Signin';

export default {
  name: 'DemoPage',
  components: {
    Signin,
  },

  data: () => ({
    buttonValueOfSignin: '註冊',
    buttonValueOfLogin: '登入',
    stepState: 0,
    autoBtnValue: '自動產生假帳號/密碼',
    autoFakeObj: {},
  }),

  methods: {
    clickSendBtn(payload) {
      console.dir(payload);

      this.stepState += 1;
    },

    clickAutoFakeAccountBtn() {
      const date = new Date();
      const fakeData = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
      const fakeAccount = `${fakeData}@example.com`;
      const fakePassword = fakeData;

      this.autoFakeObj = { fakeAccount, fakePassword };
    },
  },
};
</script>

<template lang='pug'>
#app
  signin#signinCmp(
    :buttonValue='buttonValueOfSignin'
    :autoFakeAccount='autoFakeObj'
    @handle-click-send-btn='clickSendBtn'
    v-if='stepState === 0'
  )
  signin#loginCmp(
    :buttonValue='buttonValueOfLogin'
    @handle-click-send-btn='clickSendBtn'
    v-if='stepState === 1'
  )

  button#autoBtn(@click='clickAutoFakeAccountBtn') {{ autoBtnValue }}
</template>
