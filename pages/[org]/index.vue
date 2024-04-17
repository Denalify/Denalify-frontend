<template>
	<div class="text-white h-full flex flex-col">
		<PopupOrgLeave v-if="leaveorg" @closeclicked="leaveorg = false" :orgid="orgs.data.id"/>

		<div class="w-full px-4 py-8 flex justify-end border-b-2 border-first">
			<div>
				<p>👋 Hello, {{ user.username }}</p>
			</div>
		</div>
  
		<div class="flex w-full h-full">
			<div class="w-full h-full p-12">
				<div class="w-full h-full bg-first/50 rounded-3xl p-6">
					<div class="flex flex-wrap gap-6">
						<div>
							<img v-if="orgs.data.attributes.logo.data" class="rounded-2xl w-24 h-24 xl:h-36 xl:w-36 object-contain" :src="'https://strapi.denalify.com'+ orgs.data.attributes.logo.data.attributes.url" alt="">
							<div v-else  class="h-36 w-36 bg-slate-600 rounded-2xl"></div>
						</div>
						<div>
							<h4>{{ orgs.data.attributes.name }}</h4>
							<p>Created: {{ orgs.data.attributes.createdAt.split('T')[0] }},</p>
							<p>Admin: <span v-for="admin in orgs.data.attributes.admin_users.data">{{ admin.attributes.username }}, </span></p>
							<p>Invite code: <span class="bg-gray-700 px-2 py-1 rounded-lg text-white/60">{{ orgs.data.attributes.inviteCode }}</span></p>
							<div class="flex gap-4">
								<button @click="leaveorg = true" class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 duration-100 rounded-xl">Leave</button>
								<button v-if="isadmin" @click="destroyOrg" class="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 duration-100 rounded-xl">Destroy</button>

							</div>
						</div>
					</div>
					<div class="mt-6">
						<h4>Users:</h4>
						<div  class="flex flex-wrap gap-2 mt-2">
							<span v-for="user in orgs.data.attributes.users.data" class="mt-1 text-slate-200">{{user.attributes.username}},</span>
						</div>
					</div>
					<div class="mt-6">
						<h4>Projects:</h4>
						<div  class="flex flex-wrap gap-2 mt-2">
							<NuxtLink :to="'/'+orgs.data.attributes.name+'/'+pro.attributes.slug" v-for="pro in orgs.data.attributes.pojects.data"  class="w-full flex gap-3 px-2 py-2 rounded-lg hover:bg-third/30">
								<div class="relative w-6 h-6 rounded-md" :style="'background-color: '+ pro.attributes.color"></div>
								<p>{{pro.attributes.nazwa}}</p>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		  	<div class="w-2/3 2xl:w-full h-full p-12">
			  	<div class="w-full h-full flex flex-col gap-12">
					<div class="bg-first/50 h-full w-full rounded-3xl p-6 flex justify-center items-center">
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
const { org } = useRoute().params;

let leaveorg = ref(false)

const {data: user} = await useFetch('https://strapi.denalify.com/api/users/me?populate=*', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})


const { data: organization } = await useFetch(
	`https://strapi.denalify.com/api/organizations?filters[name][$eqi]=${org}&fields[0]=id`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
}) 


const {data: orgs} = await useFetch(`https://strapi.denalify.com/api/organizations/${organization.value.data[0].id}?populate=*`, {
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

// for (const organ in user.value.admin_in_organizations) {
// 	if (user.value.admin_in_organizations[organ].name == org) {
// 		isadmin.value = true
// 	}
// }

// let destroyOrg = async () => {
// 	const data = await useFetch(`https://strapi.denalify.com/api/organization/${orgs.value.data.id}`, {
// 		method: 'DETELE',
// 		headers: {
// 			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
// 		},
// 	})
// }


</script>
  