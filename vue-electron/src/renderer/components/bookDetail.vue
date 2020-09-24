<template>
  <div>
    <a-button icon="arrow-left" @click="$router.go(-1)">返回上一层</a-button>

  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.params);
  }
}
</script>

<style>

</style>