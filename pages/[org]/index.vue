<template>
	<div class="text-white h-full flex flex-col ">
		<PopupOrgLeave v-if="leaveorg" @closeclicked="leaveorg = false" :orgid="orgs.id"/>

		<div class="w-full px-4 py-4 flex justify-end border-b-2 border-first">
			<div>
				<p>👋 Hello, {{ user.username }}</p>
			</div>
		</div>
  
		<div class="grid grid-cols-5 w-full h-full">
			<div class="col-span-3 w-full h-full p-12 relative">
				<div class="overflow-y-auto bg-first/50 rounded-3xl p-6 absolute left-12 top-12 right-12 bottom-12">
					<div class="flex flex-wrap gap-6">
						<div>
							<img v-if="orgs.logo" class="rounded-2xl w-24 h-24 xl:h-36 xl:w-36 object-contain" :src="'https://strapi.denalify.com'+ orgs.logo.url" alt="">
							<div v-else  class="h-36 w-36 bg-slate-600 rounded-2xl"></div>
						</div>
						<div>
							<h4>{{ orgs.name }}</h4>
							<p>Created: {{ orgs.createdAt.split('T')[0] }},</p>
							<p>Admin: <span v-for="admin in orgs.admin_users">{{ admin.username }}, </span></p>
							<p>Invite code: <span class="bg-gray-700 px-2 py-1 rounded-lg text-white/60">{{ orgs.inviteCode }}</span></p>
							<div class="flex gap-4">
								<button @click="leaveorg = true" class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 duration-100 rounded-xl">Leave</button>
								<button v-if="isadmin" @click="destroyOrg" class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 duration-100 rounded-xl">Destroy</button>

							</div>
						</div>
					</div>
					<div class="mt-6">
						<h4>Users:</h4>
						<div  class="flex flex-wrap gap-2 mt-2">
							<span v-for="user in orgs.users" class="mt-1 text-slate-200">{{user.username}},</span>
						</div>
					</div>
					<div class="mt-6">
						<h4>Projects:</h4>
						<div  class="flex flex-wrap gap-2 mt-2">
							<NuxtLink :to="'/'+orgs.name+'/'+pro.slug+'/board'" v-for="pro in orgs.pojects"  class="w-full flex gap-3 px-2 py-2 rounded-lg hover:bg-third/30">
								<div class="relative w-6 h-6 rounded-md" :style="'background-color: '+ pro.color"></div>
								<p>{{pro.nazwa}}</p>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		  	<div class="col-span-2 w-full h-full p-12">
			  	<div class="w-full h-full flex flex-col gap-12">
					<div class="bg-first/50 h-full w-full rounded-3xl p-6 flex justify-center items-center">
					  	<p>Discord notifications</p>
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
const { org } = useRoute().params;

let leaveorg = ref(false)

const {data: user} = await useFetch('https://strapi.denalify.com/api/users/me?populate=*', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

const {data: orgs} = await useFetch(`https://strapi.denalify.com/api/orgbyname/${org}`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

let haveorg = ref(false)
for (const organ in user.value.organizations) {
	if (user.value.organizations[organ].name == org) {
		haveorg.value = true
	}
}
if (!haveorg.value) {
	throw createError({
		statusCode: 401,
		statusMessage: "(Unauthorized) It's not your organization"
	})

}


let isadmin = ref(false)

for (const organ in orgs.value.admin_users) {
	if (orgs.value.admin_users[organ].id == user.value.id) {
		isadmin.value = true
	}
}

let destroyOrg = async () => {
	const data = await useFetch(`https://strapi.denalify.com/api/organization/${orgs.value.data.id}`, {
		method: 'DETELE',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})
}


</script>
  