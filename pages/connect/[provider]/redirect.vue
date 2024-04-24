<template>
  <div class="h-screen w-screnn bg-background text-second">

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'test'
})

let error = ref('')
const route = useRoute()
const router = useRouter()
let jwt = useCookie('strapi_jwt')

try {
  const res = await useFetch(`https://strapi.denalify.com/api/auth/auth0/callback?access_token=${route.query.access_token}`)

  jwt.value = res.data.value.jwt


  if (res.data.value.error) {

    error.value = res.data.value.error.message

    setTimeout(() => {
      error.value = ''
  }, 8000);

  } else{
      router.push('/user')
  }

} catch (err) {
  console.error(err)
}


</script>
