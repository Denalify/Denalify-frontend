// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
	enabled: true,
	timeline: {
		enabled: true
	}
},
  app: {
		head: {
			title: 'Denalify - Project manager',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [{
					charset: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
				{
					name: 'format-detection',
					content: 'telephone=no'
				},
				{
					name: 'description',
					content: 'simple project manager'
				},
				{
					name: 'keywords',
					content: 'gamedev, gamedev polish, gamedev poland, game studio, games, game, developers, developer, 8bit, 8bitjelly, unity, unity game development, unity game, indie game, independent game, unity games, game making, fromsoftware games, indie game dev, digital extreme, unity game dev'
				},
				{
					name: 'theme-color',
					content: '#feeff5'
				}
			],
			link: [
        {
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico'
				},
				{
					rel: 'stylesheet',
					href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
					media: 'print', 
					onload: 'this.media="all"'
				},
			],

		},

	},
	modules: [
		'@nuxtjs/tailwindcss', 	  		//css framework
		'@nuxtjs/google-fonts',   		//google fonts
		'@nuxt/image',				    //images
		'@nuxtjs/robots',			    //robots
    	'@nuxtjs/strapi',         		// strapi
	],

	tailwindcss: {
		configPath: 'tailwind.config',
	},


	googleFonts: {
		display: 'swap',
		families: {
			Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		}
	},

	strapi: {
		devtools: true,
		url: 'https://strapi.denalify.com/',
		prefix: '/api',
		version: 'v4',
		cookie: {},
		cookieName: 'strapi_jwt'
	},


	css: [
		'@/assets/css/global.css',
	]
})
