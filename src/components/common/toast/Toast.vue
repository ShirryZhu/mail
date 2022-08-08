<template lang="">
  <div id="toast">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false
    },
  },
}
</script>
<style scoped>
#toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, .6);
  color: #fff;

  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>
