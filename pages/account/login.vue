<template>
  <div>
	
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'login'
})

let router = useRouter()


await navigateTo('https://strapi.denalify.com/api/connect/auth0', {
  external: true
})

</script>

<style>

</style>