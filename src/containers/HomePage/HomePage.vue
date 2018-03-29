<script>
import Button from '../../components/Button';

export default {
  name: 'homepage',
  components: { 'button-component': Button },
  data: () => ({
    buttonValueOfDemo: 'Token Demo',
    buttonValueOfLesson: 'Token 教學',
  }),
  methods: {
    /*  判斷 Button Component 傳上來的 payload 來判斷點擊的是帶著  */
    /*  buttonValueOfDemo 或者 buttonValueOfLesson 的按鈕。  */
    /*  進一步的調動 router。  */
    linkToOtherPage(payload) {
      const linkValue = payload;

      if (linkValue === this.buttonValueOfDemo) {
        this.$router.push({ path: '/demo' });
      }
      if (linkValue === this.buttonValueOfLesson) {
        this.$router.push({ path: '/lesson' });
      }
    },
  },
};
</script>

<template lang='pug'>
#app
  #container
    img(src='../../assets/logo.png')
    .row
      button-component#buttonOfDemo.button(
        :buttonValue='buttonValueOfDemo'
        @handleLinkToOtherPage='linkToOtherPage'
      )
      button-component#buttonOfLesson.button(
        :buttonValue='buttonValueOfLesson'
        @handleLinkToOtherPage='linkToOtherPage'
      )
</template>

<style lang="sass" scoped>
.row
  justify-content: center

.button
  margin: 0 10px 0 10px
</style>

