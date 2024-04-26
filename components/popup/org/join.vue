<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Join to organization</h4>
			</div>
			<div class="px-4">
				<div>
					<label for="sectionName" class="block mb-2 text-sm font-medium text-white">Organization invite code</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="code" type="text" id="sectionName" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="3RvydFrbWIG9yZbz">
					</div>
				</div>
				<div class="mt-4 text-white">

					<button @click="createOrg"  class="bg-primary hover:bg-primary/60 duration-100 px-4 py-2 rounded-xl">Join</button>
				</div>

				<div v-if="error" class="mt-4 bg-red-500/40 border border-red-500 rounded-2xl py-4 px-2 text-white">
					{{error}}
				</div>
			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const emit = defineEmits(['closeclicked'])

const router = useRouter()

let code = ref()


let error = ref()

let createOrg = () => {

	const inviteorg = useFetch(`https://strapi.denalify.com/api/invite/${code.value}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})
	.then((res) => {
		
	console.log(res.data.value)

	if (res.data.value) {
		console.log('success')

		router.go(0)
	} else {
		console.log('error')
		error.value = 'Invalid invite code'

		setTimeout(() => {
			error.value = ''
		}, 6000);
	}
	})




}

</script>