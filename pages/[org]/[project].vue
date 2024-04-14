<template>
  	<div class="text-white h-full w-full">

		<PopupSectionNew v-if="newBoardPopup" :projectid="findProject.data[0].id" @closeclicked="newBoardPopup = false" />
		<PopupSectionEdit v-if="editBoardPopup" :sectionid="sectionid"  @closeclicked="editBoardPopup = false" />
		<PopupSectionRemove v-if="removeBoardPopup" :sectionid="sectionid"  @closeclicked="removeBoardPopup = false" />
		<PopupTaskNew v-if="newTaskPopup" :sectionid="sectionid" :orgid="orgid" @closeclicked="newTaskPopup = false"/>
		<PopupTaskSee v-if="seeTaskPopup" :taskid="taskid" @closeclicked="seeTaskPopup = false" />


		<div class="w-full h-28 border-b-2 border-first pt-3 px-3 flex flex-col justify-between">
			<div>
				<div class="flex items-center gap-3">
					<div class="h-12 w-12 rounded-xl" :style="'background-color: '+projectdata.color"></div>
					<h3>{{ projectdata.nazwa }}</h3>
				</div>
			</div>
			<div class="flex items-end">
				<button class="flex items-center gap-2 px-5 py-2 rounded-t-xl">
					<img class="h-6 w-6" src="/icons/list-dashes.svg" alt="">
					<p>List</p>
				</button>
				<button class="flex items-center gap-2 px-5 py-2 rounded-t-xl bg-second">
					<img class="h-6 w-6" src="/icons/columns.svg" alt="">
					<p>Board</p>
				</button>
				<button class="flex items-center gap-2 px-5 py-2 rounded-t-xl ">
					<img class="h-6 w-6" src="/icons/calendar.svg" alt="">
					<p>Calendar</p>
				</button>
			</div>
		</div>
		<div class="projects h-[calc(100%-7rem)] flex flex-nowrap overflow-x-auto">
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
			
				<div class="px-2 py-0.5 w-full min-h-96 h-full rounded-xl bg-gradient-to-b from-second/30 to-transparent">
					<section @click="seeTask" v-for="task in board.value.data.attributes.tasks.data" :data-taskid="task.id"  class="z-0 relative pb-14 px-2 pt-2 my-2 w-full min-h-24 bg-third/20 border-2 border-third/40 hover:border-third duration-200 cursor-pointer rounded-lg">
						<div class="flex gap-2">
							<button class="h-6 min-w-6 bg-first/60 p-1 rounded-full border-2 border-third/50"><img class="h-3 w-3" src="/icons/check.svg" alt="x"></button>
							<p class="text-sm">{{ task.attributes.title }}</p>
						</div>
						<div class="absolute left-2 bottom-2">
							<p class="text-xs px-1.5 py-0.5 rounded-md border-2" :class="{'bg-blue-500/40': task.attributes.priority=='normal', 'border-blue-500': task.attributes.priority=='normal', 'bg-green-500/40': task.attributes.priority=='none', 'border-green-500/40': task.attributes.priority=='none', 'bg-red-500/40': task.attributes.priority=='important', 'border-red-500/40': task.attributes.priority=='important'}" >{{ task.attributes.priority }}</p>
						</div>
					</section>
				</div>
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
const { org, project } = useRoute().params;

const router = useRouter()

let orgid = ref()
let projectdata: any[] = []
let boardsdata: any[] = []

const { data: organization } = await useFetch(
	`http://strapi.denalify.com/api/organizations?filters[name][$eqi]=${org}&populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
})
orgid.value = organization.value.data[0].id

const { data: findProject } = await useFetch(
	`http://strapi.denalify.com/api/pojects?filters[slug][$eqi]=${project}&fields[0]=id`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
}) 



const { data: pro } = await useFetch(
	`http://strapi.denalify.com/api/pojects/${findProject.value.data[0].id}?populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
}) 
projectdata = pro.value.data.attributes

for (const board in projectdata.boards.data) {
	const { data: boards, refresh: reloadboards } = await useFetch(
	`http://strapi.denalify.com/api/boards/${projectdata.boards.data[board].id}?populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})

	boardsdata.push(boards)


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
	taskid.value = e.target.closest('section').getAttribute('data-taskid')
	console.log(taskid.value)
	seeTaskPopup.value = true
}
	
</script>