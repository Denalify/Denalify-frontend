<template>
	<div class="min-h-screen w-screen flex items-center justify-center">
		<div class="py-20 px-16 bg-first/60 border border-first rounded-3xl">
			<h2 class="text-white">Login</h2>
			<form  @submit.prevent="() => (loginEmail())" class="mt-8">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
				<div class="relative mb-6">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<i class='bx bxs-user bx-xs text-gray-500'></i>
					</div>
					<input v-model="email" type="email" id="email" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@denalify.com">
				</div>
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
				<div class="relative mb-6">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<i class='bx bxs-lock bx-xs text-gray-500' ></i>
					</div>
					<input v-model="pass" type="password" id="password" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="*******">
				</div>

				<button  class="bg-third px-5 py-1 rounded-xl font-semibold text-white text-lg">Login</button>

				<div v-if="error" class="mt-4 bg-red-500/40 border border-red-500 rounded-2xl py-4 px-2 text-white">
					{{error}}
				</div>
			</form>

			<div class="mt-8 border-t border-third py-2 text-white/70">
				<p><NuxtLink to="/account/register" class="underline">Register</NuxtLink> if you don't have account</p>
			</div>
			<div class="py-2 text-white/70">
				<p><NuxtLink to="/account/forgot-password" class="underline">Forgot password</NuxtLink>?</p>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})


let email = ref('')
let pass = ref('')

let router = useRouter()

let error = ref('')

let loginEmail = async () => {

	const loginData = {
        identifier: email.value,
        password: pass.value,
    };


    const login = await fetch(`https://strapi.denalify.com/api/auth/local`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

	const loginResponseData = await login.json();

	let jwt = useCookie('strapi_jwt')
	jwt.value = loginResponseData.jwt


	if (loginResponseData.error) {

	error.value = loginResponseData.error.message

	setTimeout(() => {
		error.value = ''
	}, 8000);

	} else{
		router.push('/user')
	}
}

</script>