<template>
  	<div class="text-white h-full w-full flex flex-col">

		<PopupSectionNew v-if="newBoardPopup" :projectid="findProject.data[0].id" @closeclicked="newBoardPopup = false" />
		<PopupSectionEdit v-if="editBoardPopup" :sectionid="sectionid"  @closeclicked="editBoardPopup = false" />
		<PopupSectionRemove v-if="removeBoardPopup" :sectionid="sectionid"  @closeclicked="removeBoardPopup = false" />
		<PopupTaskNew v-if="newTaskPopup" :sectionid="sectionid" :orgid="orgid" @closeclicked="newTaskPopup = false"/>
		<PopupTaskSee v-if="seeTaskPopup" :taskid="taskid" @closeclicked="seeTaskPopup = false"  @edittask="editTask" @removetask="removetask" />
		<PopupTaskEdit v-if="editTaskPopup" :taskid="taskid" :orgid="orgid" @closeclicked="editTaskPopup = false" />
		<PopupTaskRemove v-if="removeTaskPopup" :taskid="taskid" @closeclicked="removeTaskPopup = false" />
		<PopupProjectEdit v-if="editProjectPopup" :projectid="projectid" @closeclicked="editProjectPopup = false" />

		
		<div class="text-white w-full h-28 border-b-2 border-first pt-3 px-3 flex flex-col gap-2 justify-between">
			<div class="flex justify-between">
				<div class="projectTitle pr-24 flex items-center gap-3" :data-projectid="findProject.data[0].id">
					<div class="h-12 w-12 rounded-xl" :style="'background-color: '+projectdata.color"></div>
					<div class="flex">
						<NuxtLink :to="'/'+org" class="text-3xl text-white/80 hover:text-white duration-100">{{ org }}/</NuxtLink>
						<h3>{{ projectdata.nazwa }}</h3>
					</div>
					<button @click="editProject" class="edit hidden">
						<img class="h-6 w-6" src="/icons/pencil.svg" alt="Edit">
					</button>
				</div>
			</div>
			<div class="flex items-end projectNav">
				<NuxtLink :to="'/'+org+'/'+project+'/list'"  class="flex items-center gap-2 px-5 py-2 rounded-t-xl">
					<img class="h-6 w-6" src="/icons/list-dashes.svg" alt="">
					<p>List</p>
				</NuxtLink>
				<NuxtLink :to="'/'+org+'/'+project+'/board'"  class="flex items-center gap-2 px-5 py-2 rounded-t-xl">
					<img class="h-6 w-6" src="/icons/columns.svg" alt="">
					<p>Board</p>
				</NuxtLink>
				<NuxtLink class="flex items-center gap-2 px-5 py-2 rounded-t-xl opacity-15">
					<img class="h-6 w-6" src="/icons/calendar.svg" alt="">
					<p>Calendar</p>
				</NuxtLink>
			</div>
		</div>


		<div class="projects h-full flex flex-nowrap overflow-x-auto">
			<section v-for="board in boardsdata" :data-sectionid="board.value.data.id"  class="sectionid min-w-96 h-5/6 pt-6 px-4">
				<div class="flex justify-between mb-4 px-2">
					<p class="text-white/70">{{ board.value.data.attributes.title }}</p>

					<div class="flex gap-3">
						<button @click="newTask" title="New task">
							<img class="h-6 w-6 opacity-70" src="/icons/plus.svg" alt="">
						</button>
						<button @click="editSection" title="Change name">
							<img class="h-6 w-6 opacity-70" src="/icons/pencil.svg" alt="">
						</button>
						<button @click="removeSection" title="Remove section">
							<img class="h-6 w-6 opacity-70" src="/icons/trash.svg" alt="">
						</button>
					</div>
				</div>
			
				<draggable 
					group="tasks" 
					item-key="id" 
					@end="end" 
					@change="change"
					v-model="board.value.data.attributes.tasks.data" 
					:data-boardid="board.value.data.id" 
					 class="px-2 py-0.5 w-full min-h-96 h-full rounded-xl bg-gradient-to-b from-second/30 to-transparent">
						<template #item="{ element: task }" :key="task.id">
							<section @click="seeTask" :data-taskid="task.id" :key="task.id"  class="z-0 relative pb-14 px-2 pt-2 my-2 w-full min-h-24 duration-200 cursor-pointer rounded-lg" :class="{'bg-green-600/20 border-2 border-green-700 hover:bg-green-600/30 opacity-70': task.attributes.done, 'bg-third/20 border-2 border-third/40 hover:border-third': task.attributes.done == false}">
								<div class="flex gap-2">
									<button v-if="task.attributes.done" @click="markdone($event, task.attributes.done)" class="donemark h-6 min-w-6 bg-green-500/30 p-1 rounded-full border-2 border-green-800/50"><img class="donemark h-3 w-3" src="/icons/check.svg" alt="x"></button>
									<button v-else  @click="markdone($event, task.attributes.done)" class="donemark h-6 min-w-6 bg-first/60 p-1 rounded-full border-2 border-third/50"><img class="donemark h-3 w-3" src="/icons/check.svg" alt="x"></button>
									<p class="text-sm">{{ task.attributes.title }}</p>
									
								</div>
								<div class="absolute left-2 bottom-2">
									<p class="text-xs px-1.5 py-0.5 rounded-md border-2" :class="{'bg-blue-500/40': task.attributes.priority=='normal', 'border-blue-500': task.attributes.priority=='normal', 'bg-green-500/40': task.attributes.priority=='none', 'border-green-500/40': task.attributes.priority=='none', 'bg-red-500/40': task.attributes.priority=='important', 'border-red-500/40': task.attributes.priority=='important'}" >{{ task.attributes.priority }}</p>
								</div>
								<div class="absolute right-4 bottom-2 flex">
									<div v-for="usr in task.attributes.users.data" class="text-[0.5rem] rounded-full overflow-hidden bg-white/20 border-2 -mr-2">
										<img v-if="usr.attributes.avatar.data" class="w-6 h-6" :src="'https://strapi.denalify.com'+usr.attributes.avatar.data?.attributes.url" :alt="usr.attributes.firstname[0]+usr.attributes.lastname[0]">
										<p v-else class="text-sm w-6 h-6 flex justify-center items-center bg-[#765D4B]">{{ usr.attributes.firstname[0].toUpperCase() +usr.attributes.lastname[0].toUpperCase() }}</p>
									</div>
								</div>
							</section>
						</template>
						<template #footer>
							<button @click="newTask" title="New task" class="flex opacity-70 gap-2 items-center justify-center w-full py-2 hover:bg-second/30 rounded-xl">
								<img class="h-4 w-4 opacity-70" src="/icons/plus.svg" alt="+">
								<p class="text-sm">Add task</p>
							</button>
						</template>
				</draggable>
			</section>
			<div class="min-w-96 max-w-96 h-5/6 py-4 px-4">
				<button @click="newBoard" class="flex justify-start w-full gap-4 mb-2 px-2 hover:bg-first py-2 rounded-xl">
					<img class="h-6 w-6 opacity-70" src="/icons/plus.svg" alt="">
					<p class="text-white/70">Create new section</p>

				</button>
				<div class="px-2 py-0.5 w-full h-full rounded-xl bg-gradient-to-b from-second/10 to-transparent">

				</div>
			</div>
		</div>
  	</div>
</template>

<script lang="ts" setup>
definePageMeta({
  	layout: 'project'
})


const { org, project } = useRoute().params;
import draggable from 'vuedraggable'

const router = useRouter()


let orgid = ref()
let projectdata: any[] = []
let boardsdata: any[] = []

let taskToMove = ref()
let BoardFrom = ref()
let BoardTo = ref()


let end = (evt) => {
	BoardFrom.value = evt.from.getAttribute('data-boardid')
	BoardTo.value = evt.to.getAttribute('data-boardid')

	if (BoardFrom.value != BoardTo.value) {
		const { data: deltask} = useFetch(
		`https://strapi.denalify.com/api/tasks/${taskToMove.value.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			}
		}).then(e => {
			movedtask()
		})
		
	}

}


let change = (evt) => {
	if (evt.added?.element.attributes) {
		taskToMove.value = evt.added?.element
	}
}

let movedtask = () => {
	const { data: createtast} = useFetch(
		`https://strapi.denalify.com/api/tasks`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
			},
			body:{
				data: {
					title: taskToMove.value.attributes.title,
					done: taskToMove.value.attributes.done,
					end: taskToMove.value.attributes.end,
					priority: taskToMove.value.attributes.priority,
					content: taskToMove.value.attributes.content,
					board: BoardTo.value
				}
			}
		}
	)
	.then(e => {
		router.go(0)
	})
}


const { data: organization } = await useFetch(
	`https://strapi.denalify.com/api/organizations?filters[name][$eqi]=${org}&populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
})
orgid.value = organization.value.data[0].id

const { data: findProject } = await useFetch(
	`https://strapi.denalify.com/api/pojects?filters[slug][$eqi]=${project}&fields[0]=id`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		
}) 


const { data: pro, refresh: refpro } = await useFetch(
	`https://strapi.denalify.com/api/pojects/${findProject.value.data[0].id}?populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
}) 

projectdata = pro.value.data.attributes

for (const board in projectdata.boards.data) {
	const { data: boards } = await useFetch(
	`https://strapi.denalify.com/api/boards/${projectdata.boards.data[board].id}?populate=poject&populate=tasks&populate[tasks][populate]=users.avatar`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})
	boardsdata.push(boards)
}

let editProjectPopup = ref(false);
let projectid = ref()
let editProject = (e) => {
	projectid.value = e.target.closest('.projectTitle').getAttribute('data-projectid')

	editProjectPopup.value = true
}

let newBoardPopup = ref(false);
let newBoard = () => {
	newBoardPopup.value = true
}
let editBoardPopup = ref(false)
let sectionid = ref('')
let editSection = (e) => {
	sectionid.value = e.target.closest('section').getAttribute('data-sectionid')
	editBoardPopup.value = true
}

let removeBoardPopup = ref(false)
let removeSection = (e) => {
	sectionid.value = e.target.closest('section').getAttribute('data-sectionid')
	removeBoardPopup.value = true
}

let newTaskPopup = ref(false)
let newTask = (e) => {
	sectionid.value = e.target.closest('section').getAttribute('data-sectionid')
	newTaskPopup.value = true
}


let seeTaskPopup = ref(false)
let taskid = ref()
let seeTask = (e) => {
	if (e.target != e.target.closest('.donemark')) {
		taskid.value = e.target.closest('section').getAttribute('data-taskid')
		seeTaskPopup.value = true
	}
}


let editTaskPopup = ref(false)
let editTask = () => {
	seeTaskPopup.value = false
	editTaskPopup.value = true
}

let removeTaskPopup = ref(false)
let removetask = () => {
	seeTaskPopup.value = false
	removeTaskPopup.value = true
}


let markdone = (e, done) => {
	taskid.value = e.target.closest('section').getAttribute('data-taskid')

	const changetaskdone = useFetch(`https://strapi.denalify.com/api/tasks/${taskid.value}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		body: {
			data: {
				done: !done
			}
		}
	});

	router.go(0)
}
	
</script>

<style>
.projectTitle:hover .edit {
	display: block;
}
</style>