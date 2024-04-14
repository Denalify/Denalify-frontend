<template>
  <div>
	{{ router.query }}
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'test'
})

const router = useRoute()
let jwt = useCookie('strapi_jwt')

console.log(router)

console.log(jwt.value)

jwt.value = router.query.access_token

console.log(jwt.value)



</script>
