<template lang="">
  <div>
    <h1>{{ iid }}</h1>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      isRefresh: false,
    }
  },
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>
<style scoped></style>
