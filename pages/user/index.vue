<template>
  <div class="text-white h-full flex flex-col">

	<PopupOrgJoin v-if="joinOrgPopup" @closeclicked="joinOrgPopup = false" />
	<PopupProfileEdit v-if="editProfilePopup" :userid="user.id" @closeclicked="editProfilePopup = false" />

	<div class="w-full px-4 py-8 flex justify-between border-b-2 border-first">
		<h2>Your profile</h2>
		<div>
			<p>👋 Hello, {{ user.username }}</p>
		</div>
	</div>

	<div class="grid grid-cols-5 w-full h-full">
		<div class="col-span-3 w-full h-full p-12 relative">
			<div class="overflow-y-auto bg-first/50 rounded-3xl p-6 absolute left-12 top-12 right-12 bottom-12">
				<button @click="editProfile"  class="bg-green-600 hover:bg-green-600/60 duration-100 px-3 py-1.5 rounded-lg absolute right-3 top-3"><img class="h-4 w-4" src="/icons/pencil.svg" alt=""></button>
				<div class="flex flex-wrap gap-6">
					<div>
						<img v-if="user.avatar" class="rounded-2xl w-24 h-24 xl:h-36 xl:w-36 object-cover" :src="'https://strapi.denalify.com'+ user.avatar.formats.thumbnail.url" alt="">
						<div v-else  class="h-36 w-36 bg-slate-600 rounded-2xl flex justify-center items-center text-5xl">
							<p v-if="user.firstname && user.lastname">{{ user.firstname[0].toUpperCase()+user.lastname[0].toUpperCase() }}</p>
							<p v-else>{{ user.username[0].toUpperCase() }}</p>
						</div>
					</div>
					<div>
						<h4>{{ user.username }}</h4>
						<p v-if="user.firstname && user.lastname">{{ user.firstname }} {{ user.lastname }}</p>
						<p>{{ user.email }}</p>
						<p>Number of tasks: {{ user.tasks.length }}</p>
					</div>
				</div>
				<div class="mt-6 ">
					<h4>Yours organizations:</h4>
					<div v-if="orgs.length > 0" class="flex flex-col gap-2 mt-2 h-full">
						<NuxtLink :to="'/'+org.attributes.name" v-for="org in orgs" class="p-2 bg-second/30 rounded-xl border-2 border-second flex gap-3">
							<img v-if="org.attributes.logo.data" class="rounded-xl w-14 h-14 object-contain" :src="'https://strapi.denalify.com'+org.attributes.logo.data.attributes.url" alt="logo">
							<div v-else class="h-28 w-28 bg-gray-500 rounded-xl"></div>
							<div>
								<p class="mt-1 text-slate-200">{{ org.attributes.name }}</p>
								<p class="text-slate-200">Users: {{ org.attributes.users.data.length }}</p>
							</div>
		
						</NuxtLink>
						<button @click="joinOrg" class="py-2 h-fit flex gap-3 justify-center items-center bg-second/30 rounded-xl border-2 border-second">
							<img class="h-5 w-5" src="/icons/plus.svg" alt="+">
							<p class="mt-1 text-xl text-slate-200">Join</p>
						</button>
					</div>
					<div v-else>
						<p class="text-white/60">Hey.. You don't have any organization</p>
						<button @click="joinOrg" class="w-full py-2 h-fit flex gap-3 justify-center items-center bg-second/30 rounded-xl border-2 border-second">
							<img class="h-5 w-5" src="/icons/plus.svg" alt="+">
							<p class="mt-1 text-xl text-slate-200">Join</p>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-2 w-full h-full p-12">
			<div class="w-full h-full flex flex-col gap-12">
				<div class="bg-first/50 h-full w-full rounded-3xl flex justify-center items-center">
					<p class="animate-pulse">Coming soon...</p>
				</div>
				<div class="bg-first/50 h-full w-full rounded-3xl p-6 flex justify-center items-center">
					<p class="animate-pulse">Coming soon...</p>
				</div>
			</div>
		</div>
	</div>

  </div>
</template>

<script lang="ts" setup>

let orgs = []

const {data: user} = await useFetch('https://strapi.denalify.com/api/users/me?populate=*', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})


for (const or in user.value.organizations) {
	const {data} = await useFetch(`https://strapi.denalify.com/api/organizations/${user.value.organizations[or].id}?populate=logo&populate=users`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})
	orgs.push(data.value.data)
}


let joinOrgPopup = ref(false)
let joinOrg = () => {
	joinOrgPopup.value = true
}


let editProfilePopup = ref(false)
let editProfile = () => {
	editProfilePopup.value = true
}
</script>
