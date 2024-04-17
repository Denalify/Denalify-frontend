<template>
	<div class="h-full py-8 pl-8 min-w-80 w-80">

		<PopupOrgCreate v-if="createOrg"  @closeclicked="createOrg = false" />

		<PopupProjectNew v-if="newProject" :orgid="orgid"  @closeclicked="newProject = false" />

		<div class="px-1 w-full h-full bg-first/30 border-2 border-first rounded-3xl">
			<div class="menu h-full w-full flex flex-col justify-between py-6 overflow-y-auto">
				<div id="top" class="flex justify-center">
					<img class="w-2/4" src="/logo.png" alt="denalify">
				</div>
				<ClientOnly>
					<div id="center" class="text-white px-1 my-8">
						<p>Organizations</p>
						
							<div v-for="org in orgs" :data-orgid="org.id"  class="organization mt-3 bg-first/70 py-2 px-2 rounded-xl duration-150">
								
								<button @click="toggleOrg" class="w-full flex items-center gap-4">
									<p>{{ org.attributes.name }}</p>
									<NuxtImg src="/icons/caret-down.svg" alt="\/" class="h-4 w-4 arrow duration-150 -rotate-90" />
								</button>
								<div class="projects mt-2 flex flex-col gap-0.5 hidden">

									<NuxtLink v-for="pro in org.attributes.pojects.data" :to="'/'+org.attributes.name+'/'+pro.attributes.slug"  class="w-full px-2 py-2 rounded-lg hover:bg-third/30">
										<div class="flex gap-3">
											<div class="relative w-6 h-6 rounded-md" :style="'background-color: '+ pro.attributes.color"></div>
											<p>{{pro.attributes.nazwa}}</p>
										</div>
									</NuxtLink>



									<button @click="craeteProject"  class="w-full flex gap-3 px-2 py-2 rounded-lg hover:bg-third/30 opacity-60">
										<div class="relative w-6 h-6 rounded-md bg-slate-600/70" ></div>
										<p>Add project</p>
									</button>

									<p>test</p>
								</div>
							</div>
						
						<button class="mt-3 w-full bg-second/10 hover:bg-second/30 duration-100 py-2 px-2 rounded-xl">
							
							<button @click="createOrg = true" class="flex gap-4">
								<NuxtImg src="/icons/plus.svg" alt="+" class="h-6 w-6 opacity-50" />
								<p class="text-white/50">New organization</p>
							</button>
						</button>

					</div>
				</ClientOnly>

				<div id="bottom" class="w-full flex flex-col pl-4 gap-1">
					<button @click="router.push('/user')" class="text-white text-lg flex gap-4 w-fit py-2 px-4 rounded-xl hover:bg-second/30 duration-150">
						<NuxtImg src="/icons/user.svg" class="w-6 h-6"/>
						Profile
					</button>
					<button @click="logoutButton" class="text-white text-lg flex gap-4 w-fit py-2 px-4 rounded-xl hover:bg-second/30 duration-150">
						<NuxtImg  src="/icons/sign-out.svg" class="w-6 h-6"/>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts" setup>
const router = useRouter()
const { logout } = useStrapiAuth()

const logoutButton = () => {
  logout()

  router.push('/')
}


let orgs: any[] = []

const {data:me} = await useFetch('https://strapi.denalify.com/api/users/me', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

const {data} = await useFetch('https://strapi.denalify.com/api/organizations?populate[0]=pojects&populate[pojects][populate]=users', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

orgs = data.value.data

console.log(orgs)
const {data: projects} = await useFetch('https://strapi.denalify.com/api/pojects?populate[0]=organization', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})


// for(const org in orgs){

// 	orgs[org].attributes.pojects = []

// 	for (const project in projects.value.data) {
// 		orgs[org].attributes.pojects += JSON.parse(projects.value.data[project])
// 	}

// 	console.log(orgs[org].attributes)
// }




let createOrg = ref(false)
let toggleOrg = (e) => {
	e.target.closest('div').querySelector('.projects').classList.toggle('hidden')
	e.target.closest('div').querySelector('.arrow').classList.toggle('-rotate-90')
}

let orgid = ref()
let newProject = ref(false)
let craeteProject = (e) => {
	orgid.value = e.target.closest('.organization').getAttribute('data-orgid')

	newProject.value = true
}

</script>

<style>
.menu::-webkit-scrollbar {
	height: .6em;
	width: .6em;
	padding-left: 30px;
}

.menu::-webkit-scrollbar-track {
	background-color: #201d1d7e;
	border-radius: 1em;
}

.menu::-webkit-scrollbar-thumb {
	background-color: rgb(97, 71, 53);
	border-radius: 1em;
}

.menu::-webkit-scrollbar-thumb:hover {
	background-color: rgb(185, 137, 109);
	border-radius: 1em;
}

</style>
