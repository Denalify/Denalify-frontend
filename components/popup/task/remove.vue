<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Are you sure about it?</h4>
			</div>
			<div class="px-4">
				<div class="text-white/80 mb-8">
				<p>Do you really want to remove this task?</p>
				</div>
				<div class="mt-4 text-white">
					<button @click="removetask"  class="bg-primary hover:bg-primary/60 duration-100 px-4 py-2 rounded-xl"> Yes, remove</button>
				</div>
			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const props = defineProps(['taskid']);
const emit = defineEmits(['closeclicked'])

const router = useRouter()

let commentIds = ref([])

const {data: task} = useFetch(
	`https://strapi.denalify.com/api/tasks/${props.taskid}?populate=comments`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
})
.then((res) => {

	for (const comment in res.data.value.data.attributes.comments.data) {
		commentIds.value.push(res.data.value.data.attributes.comments.data[comment].id)
	}

})


let removetask = () => {

	const remtask = useFetch(
	`https://strapi.denalify.com/api/tasks/${props.taskid}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})


	for (const comId in commentIds.value) {

		const remcom = useFetch(
		`https://strapi.denalify.com/api/comments/${commentIds.value[comId]}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			},
		})
		
	}

	router.go(0)
}
</script>