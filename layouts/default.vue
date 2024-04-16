<template>
	<div class="flex bg-background h-screen w-screen">
		<SidebarMain/>
		<div class="p-8 w-[calc(100%-320px)] h-full block">
			<div class="h-full bg-first/30 border-2 border-first rounded-3xl ">
				<slot/>
			</div>
		</div>

	</div>
</template>
<script setup lang="ts">
const {data: user} = await useFetch('https://strapi.denalify.com/api/users/me', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

if (!user.value) {
	throw createError({
		statusCode: 401,
		statusMessage: '(Unauthorized) You dont have account'
	})

}
</script>