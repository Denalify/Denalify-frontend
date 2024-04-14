<template>
	<div class="text-white">
		<button @click="onClick" class="bg-gray-500">logout</button>

		<div>
			
		</div>
	</div>
</template>

<script setup lang="ts">
const { logout } = useStrapiAuth()


const router = useRouter()


const onClick = () => {
  logout()

  router.push('/')
}


</script>