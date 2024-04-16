<template>
	<div class="min-h-screen w-screen flex items-center justify-center">
		<div class="py-20 px-16 bg-first/60 border border-first rounded-3xl">
			<h2 class="text-white">Remind password</h2>
			<form  @submit.prevent="() => (remindPass())" class="mt-8">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
				<div class="relative mb-6">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<i class='bx bxs-user bx-xs text-gray-500'></i>
					</div>
					<input v-model="email" type="email" id="email" class="bg-white/20 border border-white/60 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@denalify.com">
				</div>

				<button  class="bg-third px-5 py-1 rounded-xl font-semibold text-white text-lg">Remind Password</button>

				<div v-if="error" class="mt-4 bg-red-500/40 border border-red-500 rounded-2xl py-4 px-2 text-white">
					{{error}}
				</div>
				<div v-if="success" class="mt-4 bg-green-500/40 border border-green-500 rounded-2xl py-4 px-2 text-white">
					{{success}}
				</div>
			</form>

		</div>

	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})


let email = ref('')


let router = useRouter()

let error = ref('')
let success = ref('')

let remindPass = async () => {

	const loginData = {
        email: email.value
    };


    const login = await fetch(`http://strapi.denalify.com/api/auth/forgot-password`, {
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
		success.value = 'Check your email inbox'
		
	}
}

</script>