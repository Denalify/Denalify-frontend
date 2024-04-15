<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		  <div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit min-h-96 h-fit">
			  <button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			  <div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				  <h4 class="text-white">Edit task</h4>
			  </div>
			  <div class="px-4">
				  <div>
					  	<label for="taskName" class="block mb-2 text-sm font-medium text-white">Task name</label>
						<div class="relative mb-6">
							<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
								<i class='bx bxs-cube bx-xs text-gray-500'></i>
							</div>
							<input v-model="name" type="text" id="taskName" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="New task">
						</div>

						<label for="date" class="block mb-2 text-sm font-medium text-white">Deadline</label>
						<div class="relative mb-6">
							<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
								<i class='bx bxs-cube bx-xs text-gray-500'></i>
							</div>
							<input v-model="date" type="date" id="date" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="New task">
						</div>

						<label for="priority" class="block mb-2 text-sm font-medium text-white">Select priority</label>
						<select id="priority" v-model="priority" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
							<option class="bg-background text-white" disabled value="sel" selected>Choose priority</option>
							<option class="bg-background text-white" value="none">Low</option>
							<option class="bg-background text-white" value="normal">Normal</option>
							<option class="bg-background text-white" value="important">Important</option>
						</select>
						<div class="mt-4">
							<p class="mb-4 font-semibold text-white">Link users</p>
							<ul class="w-full text-sm font-medium text-white/90 bg-first/40 border border-second rounded-lg">
								<li v-for="user in users.data"  class="w-full border-b border-second rounded-t-lg">
									<div class="flex items-center ps-3">
										<input v-model="selectendUsers" :id="user.attributes.username" type="checkbox" :value="user.id" class="w-4 h-4 text-third bg-gray-100 border-gray-300 rounded focus:ring-third focus:ring-2">
										<label :for="user.attributes.username" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{user.attributes.firstname }} {{ user.attributes.lastname }} <span class="text-xd text-white/60"> ({{ user.attributes.username }})</span></label>
									</div>
								</li>
							</ul>
						</div>
				  </div>
				  <div class="mt-4 text-white">
  
					  <button @click="editTask"  class="bg-third hover:bg-third/60 duration-100 px-4 py-2 rounded-xl">Save</button>
				  </div>
			  </div>
			  
  
  
		  </div>
	</div>
</template>
  

<script lang="ts" setup>
const props = defineProps(['taskid', 'orgid']);
const emit = defineEmits(['closeclicked'])

const router = useRouter()
  
let users = ref()


let selectendUsers = []

const {data: org} = await useFetch(`http://strapi.denalify.com/api/organizations/${props.orgid}?populate=*`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})
users.value = org.value.data.attributes.users;

let {data: task} = await useFetch(`http://strapi.denalify.com/api/tasks/${props.taskid}?populate=users`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

console.log(task.value.data.attributes)

selectendUsers = ref(task.value.data.attributes.users.data)
let name = ref(task.value.data.attributes.title)
let priority = ref(task.value.data.attributes.priority)
let date = ref(task.value.data.attributes?.end)

for (const usr in task.value.data.attributes.users.data) {
	selectendUsers.value.push(task.value.data.attributes.users.data[usr].id)
	console.log(task.value.data.attributes.users.data[usr].id)
}

console.log(selectendUsers)

let editTask = () => {
	
	console.log(selectendUsers.value)
	const newBoard = useFetch(
		`http://strapi.denalify.com/api/tasks/${props.taskid}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			},
			body: {
				data: {
					title: name.value,
					priority: priority.value,
					board: props.sectionid,
					users: selectendUsers,
					end: date.value
				}

			}

	})

	router.go(0)

}
</script>