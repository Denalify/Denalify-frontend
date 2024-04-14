<template>
  <div class="text-white h-full flex flex-col">
	<div class="w-full px-4 py-8 flex justify-between border-b-2 border-first">
		<h2>Your profile</h2>
		<div>
			<p>👋 Hello, {{ user.username }}</p>
		</div>
	</div>

	<div class="flex w-full h-full">
		<div class="w-full h-full p-12">
			<div class="w-full h-full bg-first/50 rounded-3xl p-6">
				<div class="flex flex-wrap gap-6">
					<div>
						<img v-if="user.avatar" class="rounded-2xl w-24 h-24 xl:h-36 xl:w-36 object-cover" :src="'http://strapi.denalify.com'+ user.avatar.formats.thumbnail.url" alt="">
						<div v-else  class="h-36 w-36 bg-slate-600 rounded-2xl flex justify-center items-center text-5xl">{{ user.firstname[0] }}{{ user.lastname[0] }}</div>
					</div>
					<div>
						<h4>{{ user.username }}</h4>
						<p>{{ user.firstname }} {{ user.lastname }}</p>
						<p>{{ user.email }}</p>
						<p>Number of tasks: {{ user.tasks.length }}</p>
					</div>
				</div>
				<div class="mt-6">
					<h4>Yours organizations:</h4>
					<div v-if="orgs.length > 0" class="flex flex-wrap gap-2 mt-2">
						<NuxtLink :to="'/'+org.attributes.name" v-for="org in orgs" class="p-2 bg-second/30 rounded-xl border-2 border-second">
							<img v-if="org.attributes.logo.data" class="rounded-xl w-28 h-28 object-contain" :src="'http://strapi.denalify.com'+org.attributes.logo.data.attributes.url" alt="logo">
							<div v-else class="h-28 w-28 bg-gray-500 rounded-xl"></div>
							<p class="mt-1 text-slate-200">{{ org.attributes.name }}</p>
						</NuxtLink>
					</div>
					<div v-else>
						<p class="text-white/60">Hey.. You don't have any organization</p>
					</div>
				</div>
			</div>
		</div>
		<div class="w-2/3 2xl:w-full h-full p-12">
			<div class="w-full h-full flex flex-col gap-12">
				<div class="bg-first/50 h-full w-full rounded-3xl">
					<div class="w-full px-4 py-4 border-b-2 border-first">
						<h3>Connect</h3>
					</div>
					<div class="flex flex-col">
						<div class="w-full flex justify-between items-center px-8 py-4 hover:bg-second/30">
							<div>
								<h4>Discord</h4>
							</div>
							<div>
								<NuxtLink to="http://strapi.denalify.com/api/connect/discord" target="_blank" rel="noopener noreferrer"  class="bg-green-600 px-3 py-2 rounded-xl">Connect</NuxtLink>
							</div>
						</div>
						<div class="w-full flex justify-between items-center px-8 py-4 hover:bg-second/30">
							<div>
								<h4>Github</h4>
							</div>
							<div>
								<NuxtLink to="http://strapi.denalify.com/api/connect/github" target="_blank" rel="noopener noreferrer"  class="bg-green-600 px-3 py-2 rounded-xl">Connect</NuxtLink>
							</div>
						</div>
						<div class="w-full flex justify-between items-center px-8 py-4 hover:bg-second/30">
							<div>
								<h4>Google</h4>
							</div>
							<div>
								<NuxtLink to="http://strapi.denalify.com/api/connect/google" target="_blank" rel="noopener noreferrer"  class="bg-green-600 px-3 py-2 rounded-xl">Connect</NuxtLink>
							</div>
						</div>
					</div>
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

const {data: user} = await useFetch('http://strapi.denalify.com/api/users/me?populate=*', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})


const {data: use} = await useFetch('http://strapi.denalify.com/api/users/me?populate=organizations,5', {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
})

console.log(use)

for (const or in user.value.organizations) {
	const {data} = await useFetch(`http://strapi.denalify.com/api/organizations/${user.value.organizations[or].id}?populate=*`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})
	orgs.push(data.value.data)
}

</script>
