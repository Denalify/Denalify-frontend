<template>
	<div class="relative flex justify-center items-center bg-background w-screen h-screen overflow-hidden">
		<div v-if="nerror">
			<div class="flex flex-col justify-center items-center max-w-xl relative">
				<p class="z-0 absolute bottom-1/2 translate-y-1/3 text-[18rem] font-semibold tracking-widest text-transparent text-8xl bg-clip-text bg-gradient-to-b from-darkest/30 to-transparent">{{ nerror.statusCode }}</p>
				<p class="mt-24 text-darkest/90 z-50">{{ nerror.message }}</p>
				<button @click="handleClearError" class="z-[50] bg-second py-2 px-4 rounded-xl text-white mt-4 duration-300 hover:bg-second/80 hover:shadow-second/50 hover:shadow-xl">Go back</button>
			</div>
		</div>
		<div v-else>
			<NuxtErrorBoundary>
				<div class="flex flex-col justify-center items-center max-w-xl relative">
					<p class="z-0 absolute bottom-1/2 translate-y-1/3 text-[18rem] font-semibold tracking-widest text-transparent text-8xl bg-clip-text bg-gradient-to-b from-darkest/30 to-transparent">{{ error.statusCode }}</p>
					<p class="mt-24 text-darkest/90 z-50">{{ error.message }}</p>
					<button @click="handleClearError" class="z-[50] bg-second py-2 px-4 rounded-xl text-white mt-4 duration-300 hover:bg-second/80 hover:shadow-second/50 hover:shadow-xl">Go back</button>
				</div>
			</NuxtErrorBoundary>
		</div>
	</div>
</template>
<script setup lang="ts">
const route = useRoute()
defineProps(['error'])

let nerror:any;
if (route.query.error_description) {
	nerror = {message: route.query.error_description, statusCode: 401}
}


const handleClearError = () => clearError({ redirect: '/' })
</script>