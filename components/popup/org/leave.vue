<template>
	<div class="absolute z-50 left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
		<div class="relative bg-background rounded-2xl border-2 border-first py-8 min-w-96 w-fit h-fit">
			<button @click="emit('closeclicked')" class="absolute right-2 top-2 p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			<div class="w-full pb-4 border-b-2 border-first px-4 mb-4">
				<h4 class="text-white">Are you sure about it?</h4>
			</div>
			<div class="px-4">
				<div class="text-white/80 mb-8">
				<p>Do you really want to leave this organization?</p>
				</div>
				<div class="mt-4 text-white">
					<button @click="leaveOrg"  class="bg-primary hover:bg-primary/60 duration-100 px-4 py-2 rounded-xl">Yes, leave</button>
				</div>
			</div>
			


		</div>
	</div>
</template>
  
<script lang="ts" setup>
const props = defineProps(['orgid']);
const emit = defineEmits(['closeclicked'])
  
const router = useRouter()

  
let leaveOrg = () => {


	const {data: usr} = useFetch(`https://strapi.denalify.com/api/users/me?fields[0]=id`, {
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
	})

	console.log(usr)

	setTimeout(() => {
		const leave = useFetch(
		`https://strapi.denalify.com/api/organizations/${props.orgid}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: {
				data: {
					users: {
						disconnect: usr.value.id
					}
				}

			}
		})
		.then(() => {
			router.push('/user')
		})
	}, 150);

	
  

	
}
  </script>