<script>
export default {
  name: 'Signin',
  props: {
    buttonValue: {
      type: String,
      default: '按鈕',
    },
    autoFakeAccount: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    accountValue: '',
    passwordValue: '',
  }),

  methods: {
    clickSendBtn() {
      const payload = {
        // state: stateOprator[this.state],
        account: this.accountValue,
        password: this.passwordValue,
      };
      console.log('send btn work!');
      this.$emit('handle-click-send-btn', payload);
    },
  },

  watch: {
    autoFakeAccount(newVal, oldVal) {
      this.accountValue = newVal.fakeAccount;
      this.passwordValue = newVal.fakePassword;
    },
  },
};
</script>

<template lang="pug">
#app
  .row
    label 帳號：
    input#input-account(type='text' placeholder='請輸入假信箱...' v-model='accountValue')
  .row
    label 密碼：
    input#input-password(type='password' placeholder='請輸入假密碼...' v-model='passwordValue')
  .row
    button#button-send(@click='clickSendBtn') {{ buttonValue }}
</template>

<style lang="sass" scoped>
.row
  justify-content: center
  margin: 5px 0px
</style>
