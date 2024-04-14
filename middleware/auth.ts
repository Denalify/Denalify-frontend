export default defineNuxtRouteMiddleware((to, _from) => {
	const user = useStrapiUser()
	if (!user.value) {
	  	useCookie('redirect', { path: '/' }).value = to.fullPath
	  	return navigateTo('/account/login')
	} else{
		useCookie('redirect', { path: '/user' }).value = to.fullPath
	  	return navigateTo('/user')
	}
})