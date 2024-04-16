<template>
	<div class="min-h-screen w-screen flex items-center justify-center">
		<div class="py-20 px-16 bg-first/60 border border-first rounded-3xl">
			<h2 class="text-white">Register</h2>
			<form  @submit.prevent="() => (loginEmail())" class="mt-8">
			<div class="flex gap-3">
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-user bx-xs text-gray-500'></i>
						</div>
						<input v-model="username" type="text" id="username" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Username">
					</div>
				</div>
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-user bx-xs text-gray-500'></i>
						</div>
						<input v-model="email" type="email" id="email" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@denalify.com">
					</div>
				</div>
			</div>

			<div class="flex gap-3">
				<div>
					<label for="fname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-user bx-xs text-gray-500'></i>
						</div>
						<input v-model="fname" type="text" id="fname" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Josh">
					</div>
				</div>
				<div>
					<label for="lname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-user bx-xs text-gray-500'></i>
						</div>
						<input v-model="lname" type="text" id="lname" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Kowalski">
					</div>
				</div>
			</div>

			<div class="flex gap-3">
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-lock bx-xs text-gray-500' ></i>
						</div>
						<input v-model="pass" type="password" id="password" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="*******">
					</div>
				</div>
				<div>
					<label for="rpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
							<i class='bx bxs-lock bx-xs text-gray-500' ></i>
						</div>
						<input v-model="rpass" type="password" id="rpassword" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="*******">
					</div>
				</div>
			</div>
				
				
				

				<button  class="bg-third px-5 py-1 rounded-xl font-semibold text-white text-lg">Register</button>

				<div v-if="error" class="mt-4 bg-red-500/40 border border-red-500 rounded-2xl py-4 px-2 text-white">
					{{error}}
				</div>
				<div v-if="success" class="mt-4 bg-green-500/40 border border-green-500 rounded-2xl py-4 px-2 text-white">
					{{success}}
				</div>
			</form>

			<div class="mt-8 border-t border-third py-2">
				<p class="text-third/80">Register with</p>
				<div class="flex flex-col gap-4 mt-4">
					<button class="bg-third hover:bg-third/60 px-5 py-1 rounded-xl text-white text-lg flex justify-center items-center gap-2">
						<img src="/icons/discord-logo.svg" class="h-5" alt="">	
						Discord
					</button>
					<button class="bg-third hover:bg-third/60 px-5 py-1 rounded-xl text-white text-lg flex justify-center items-center gap-2">
						<img src="/icons/github-logo.svg" class="h-5" alt="">	
						Github
					</button>
					<button class="bg-third hover:bg-third/60 px-5 py-1 rounded-xl text-white text-lg flex justify-center items-center gap-2">
						<img src="/icons/google-logo.svg" class="h-5" alt="">	
						Google
					</button>
				</div>
			</div>

			<div class="mt-8 border-t border-third py-2 text-white/70">
				<p><NuxtLink to="/account/login" class="underline">Login</NuxtLink> if you have account</p>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})

let username = ref('')
let email = ref('')
let fname = ref('')
let lname = ref('')
let pass = ref('')
let rpass = ref()

let router = useRouter()

let error = ref('')
let success = ref('')

let loginEmail = async () => {

	if (pass.value != rpass.value) {
		error.value = "Passwords not matching"
	} else {
		
		const registerData = {
			username: username.value,
			email: email.value,
			firstname: fname.value,
			lastname: lname.value,
			password: pass.value,
		};


		const register = await fetch(`http://strapi.denalify.com/api/auth/local/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(registerData),
		})

		const registerResponseData = await register.json();

		let jwt = useCookie('strapi_jwt')
		jwt.value = registerResponseData.jwt


		if (registerResponseData.error) {

		error.value = registerResponseData.error.message

		setTimeout(() => {
			error.value = ''
		}, 8000);

		} else{
			success.value = 'Check your email inbox to confirm account'
		}
	}

}

</script>