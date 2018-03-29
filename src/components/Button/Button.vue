<script>
export default {
  name: 'button',
  props: {
    buttonValue: {
      type: String,
      default: '按鈕',
    },
  },
  methods: {
    linkToOtherPage() {
      const linkValue = this.buttonValue;
      if (typeof linkValue !== 'string' || linkValue === '按鈕') return;

      this.$emit('handleLinkToOtherPage', linkValue);
    },
  },
};
</script>

<template lang="pug">
#app
  button.style-button(@click='linkToOtherPage') {{ buttonValue }}
</template>

<style lang="sass" scoped>
.style-button
  width: 100px
  height: 50px
  background-color: #fdc7ff
  border-radius: 3px
  box-shadow: 0px 0px
  &:hover
    cursor: pointer
</style>
