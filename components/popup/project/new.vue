<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Create new project</h4>
			</div>
			<div class="px-4">
				<div>
					<label for="projectName" class="block mb-2 text-sm font-medium text-white">Project name</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-cube bx-xs text-gray-500'></i>
						</div>
						<input v-model="name" type="text" id="projectName" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="New project">
					</div>

					<div class="text-white">
					<label for="color" class="block mb-2 text-sm font-medium text-white">Project color</label>
					<div>
						<input v-model="color" type="color" id="color" />
					</div>
					
					
				</div>
				</div>
				<div class="mt-4 text-white">

					<button @click="createSection"  class="bg-third hover:bg-third/60 duration-100 px-4 py-2 rounded-xl">Create</button>
				</div>
			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const props = defineProps(['orgid']);
const emit = defineEmits(['closeclicked'])

const router = useRouter()


let name = ref()
let color = ref('#f6b73c')
let slug = ''



let createSection = () => {

	let preslug = name.value.split(' ')

	console.log(preslug)
	if (preslug.length > 0) {
		for (let i = 0; i < preslug.length; i++) {
			if (i+1 == preslug.length) {
				slug = slug+preslug[i]
			} else {
				slug = slug+preslug[i]+"-"
			}
		}

		console.log(slug)
	} else {
		slug = preslug
	}

	console.log(slug)

	const newBoard = useFetch(
	`https://strapi.denalify.com/api/pojects`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		body: {
			data: {
				nazwa: name.value,
				organization: props.orgid,
				color: color.value,
				tasks: null,
				slug: slug
			}

		}

	})

	slug = ''

	router.go(0)
  
}
</script>