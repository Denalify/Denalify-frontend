<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Create new organization</h4>
			</div>
			<div class="px-4">
				<div>
					<label for="sectionName" class="block mb-2 text-sm font-medium text-white">Organization name*</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="name" type="text" id="sectionName" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="New org">
					</div>

					<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Logo</label>
					<input @change="getFileObject($event)"  class="block w-full bg-white/20 border border-white/60 text-white text-sm cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file">
					<p class="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG, JPEG, ICO (MAX. 20MB)</p>

				</div>
				<div class="mt-4 text-white">

					<button @click="createOrg"  class="bg-third hover:bg-third/60 duration-100 px-4 py-2 rounded-xl">Create</button>
				</div>
			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const emit = defineEmits(['closeclicked'])

const router = useRouter()

let name = ref()
let formData = new FormData()

let getFileObject = (e: any) => {
	formData.append('files', e.target.files[0])

	const imageupload = useFetch(`https://strapi.denalify.com/api/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		body: formData
	})
	.then((res) => {
		console.log(res)
		for (let i = 0; i < res.data?.value.length; i++) {
			logo.value = res.data?.value[i].id
		}
	})
}

let logo = ref()

let createOrg = () => {

	const usr = useFetch(`https://strapi.denalify.com/api/users/me?fields[0]=id`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})

	let encCode = btoa(name.value)
	let newCode = encCode.replaceAll('=', 'x').replaceAll('+', "x").replaceAll('-', "x").replaceAll('_', "x")
			
	const newOrg = useFetch(
		`https://strapi.denalify.com/api/organizations`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			},
			body: {
				data: {
					name: name.value,
					pojects: null,
					tasks: null,
					users: usr.data.value.id,
					admin_users: usr.data.value.id,
					logo: logo.value,
					inviteCode: newCode
				}
			}
		})
	
	
		
	navigateTo(`/${name.value}`)

	emit('closeclicked')


}

</script>