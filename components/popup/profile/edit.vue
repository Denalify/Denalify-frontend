<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Change section name</h4>
			</div>
			<div class="px-4">
				<div>
					<label for="fname" class="block mb-2 text-sm font-medium text-white">First name</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="fname" type="text" id="fname" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Josh">
					</div>
				</div>
				<div>
					<label for="lname" class="block mb-2 text-sm font-medium text-white">Last name</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="lname" type="text" id="lname" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Kowalski">
					</div>
				</div>
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="username" type="text" id="username" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="username">
					</div>
				</div>

				<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Avatar</label>
				<input @change="getFileObject($event)"  class="block w-full bg-white/20 border border-white/60 text-white text-sm cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file">
				<p class="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG, JPEG, ICO (MAX. 20MB)</p>

				<div class="mt-4 text-white">

					<button @click="editprofile"  class="bg-primary hover:bg-primary/60 duration-100 px-4 py-2 rounded-xl">Save</button>
				</div>

			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const props = defineProps(['userid'])
const emit = defineEmits(['closeclicked'])

const router = useRouter()

let fname = ref()
let lname = ref()
let username = ref()
let profileAvatar = ''

let formData = new FormData()


const user = useFetch(
	`https://strapi.denalify.com/api/users/me`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
})


setTimeout(() => {
	let userData = user.data.value

	fname.value = userData.firstname
	lname.value = userData.lastname
	username.value = userData.username
}, 100);


let getFileObject = (e: any) => {
	formData.append('files', e.target.files[0])


	if (formData) {
		const imageupload = useFetch(`https://strapi.denalify.com/api/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			},
			body: formData
		}).then((res) => {

			for (let i = 0; i < res.data.value?.length; i++) {
				profileAvatar = res.data?.value[i].id
			}
		})
	}
}


let editprofile = () => {


	const edit = useFetch(
	`https://strapi.denalify.com/api/user/me`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		body: {
			avatar: profileAvatar,
			firstname: fname.value,
			lastname: lname.value,
			username: username.value,
		}

	})
	.then(()=> {
		router.go(0)
	})

}

</script>