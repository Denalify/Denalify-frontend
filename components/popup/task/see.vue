<template>
	<div class="absolute z-50 left-0 top-0 h-screen max-h-screen w-screen bg-black/30 flex items-center justify-end">
		  <div class="relative flex flex-col bg-background border-l-2 border-first py-8 min-w-96 w-5/12 max-w-[40vw] min-h-96 h-screen">
			<div class="flex gap-2 absolute right-2 top-2 p-1">
				<button @click="emit('removetask')" class="p-1 rounded-lg bg-red-600/40"><nuxt-img class="h-5 w-5" src="/icons/trash.svg"  alt="X" /></button>
				<button @click="emit('edittask')" class="p-1 rounded-lg bg-yellow-500/40"><nuxt-img class="h-5 w-5" src="/icons/pencil.svg"  alt="X" /></button>

				<button @click="emit('closeclicked')" class="p-1 rounded-lg bg-red-500/40"><nuxt-img class="h-5 w-5" src="/icons/x.svg"  alt="X" /></button>
			</div>

			<div class="w-full pb-4 border-b-2 border-first px-4">
				<button @click="markdone(task.done)" v-if="task.done" class="text-sm flex items-center gap-2 px-2 py-1 bg-green-500/20 border-2 border-green-600/60 rounded-xl"><img class="h-4 w-4" src="/icons/check.svg" alt=""> Mark as not done</button>
				<button @click="markdone(task.done)" v-else class="text-sm flex items-center gap-2 px-2 py-1 border-2 border-second rounded-xl"><img class="h-4 w-4" src="/icons/check.svg" alt=""> Mark as done</button>
			</div>
			<div class="relative h-full toscroll overflow-y-auto pt-4">
				<div class="px-4">
					<h2>{{ task.title }}</h2>
					<div class="mt-10 pl-8 text-white/90 flex flex-col gap-2">
						<div class="flex gap-4">
							<p>Users assigned:</p>
							<div>
								<span class="text-white/80" v-if="task.users.data.length == 0" >None</span>
								<div v-else class="flex">
									<div v-for="usr in task.users.data" class="text-[0.5rem] rounded-full overflow-hidden bg-white/20 border-2 -mr-2">
										<img v-if="usr.attributes.avatar.data" class="w-6 h-6" :src="'http://strapi.denalify.com'+usr.attributes.avatar.data?.attributes.url" :alt="usr.attributes.firstname[0]+usr.attributes.lastname[0]">
										<p v-else class="text-sm w-6 h-6 flex justify-center items-center bg-[#765D4B]">{{ usr.attributes.firstname[0].toUpperCase() +usr.attributes.lastname[0].toUpperCase() }}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="flex gap-4">
							<p>Deadline:</p>
							<div class="text-white/80">
								<p v-if="task.end" class="flex items-center gap-2" >{{ task.end }} <img class="h-5 w-5 opacity-80" src="/icons/calendar.svg" alt=""></p>
								<p v-else>not set</p>
							</div>
						</div>
						<div class="flex gap-4">
							<p>Priority:</p>
							<div class="text-white/80">
								<p class="text-xs px-1.5 py-0.5 rounded-md border-2" :class="{'bg-blue-500/40': task.priority=='normal', 'border-blue-500': task.priority=='normal', 'bg-green-500/40': task.priority=='none', 'border-green-500/40': task.priority=='none', 'bg-red-500/40': task.priority=='important', 'border-red-500/40': task.priority=='important'}" >{{ task.priority }}</p>
							</div>
						</div>
					</div>

					<div class="mt-10 px-4">
						<p>Description</p>
						<div class="taskdescription mt-2 w-full min-h-96 border-2 border-second rounded-xl">
							<div v-if="desc" class="flex flex-wrap justify-start gap-2 bg-second/30 mb-2 py-2" >
								<button title="bold" class="px-1.5 hover:bg-second" @click="desc.chain().focus().toggleBold().run()" :disabled="!desc.can().chain().focus().toggleBold().run()" :class="{ 'is-active': desc.isActive('bold') }">
									<i class='bx bx-bold'></i>
								</button>
								<button title="italic" class="italic px-1.5 hover:bg-second" @click="desc.chain().focus().toggleItalic().run()" :disabled="!desc.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': desc.isActive('italic') }">
									<i class='bx bx-italic' ></i>
								</button>
								<button title="strike" class="px-1.5 line-through hover:bg-second" @click="desc.chain().focus().toggleStrike().run()" :disabled="!desc.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': desc.isActive('strike') }">
									<i class='bx bx-strikethrough' ></i>
								</button>
								<button title="code" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleCode().run()" :disabled="!desc.can().chain().focus().toggleCode().run()" :class="{ 'is-active': desc.isActive('code') }">
									<i class='bx bx-code' ></i>
								</button>
								<div class="border border-white/50"></div>
								<button title="parapgraph" class="px-1 hover:bg-second" @click="desc.chain().focus().setParagraph().run()" :class="{ 'is-active': desc.isActive('paragraph') }">
									<i class='bx bx-paragraph' ></i>
								</button>
								<button title="heading 1" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': desc.isActive('heading', { level: 1 }) }">
									<i class='bx bx-heading' ></i><span class="text-xs">1</span>
								</button>
								<button title="heading 2" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': desc.isActive('heading', { level: 2 }) }">
									<i class='bx bx-heading' ></i><span class="text-xs">2</span>
								</button>
								<button title="bullet list" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleBulletList().run()" :class="{ 'is-active': desc.isActive('bulletList') }">
									<i class='bx bx-list-ul' ></i>
								</button>
								<button title="ordered list" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': desc.isActive('orderedList') }">
									<i class='bx bx-list-ol' ></i>
								</button>
								<button title="code block" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': desc.isActive('codeBlock') }">
									<i class='bx bx-code-block' ></i>
								</button>
								<div class="border border-white/50"></div>
								<button title="block quote" class="px-1 hover:bg-second" @click="desc.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': desc.isActive('blockquote') }">
									<i class='bx bxs-quote-alt-right'></i>
								</button>
								<button title="horizontal line" class="px-1 hover:bg-second" @click="desc.chain().focus().setHorizontalRule().run()">
									<i class='bx bx-dots-horizontal'></i>
								</button>
								<button title="new line" class="px-1 hover:bg-second" @click="desc.chain().focus().setHardBreak().run()">
									<img class="h-5 w-5" src="/icons/arrow-bend.svg" alt="">
								</button>
								<button title="undo" class="px-1 hover:bg-second" @click="desc.chain().focus().undo().run()" :disabled="!desc.can().chain().focus().undo().run()">
									<i class='bx bx-undo'></i>
								</button>
								<button title="redo" class="px-1 hover:bg-second" @click="desc.chain().focus().redo().run()" :disabled="!desc.can().chain().focus().redo().run()">
									<i class='bx bx-redo' ></i>
								</button>
							</div>
							<editor-content :editor="desc" class="min-h-64 px-1 pb-1" />
						</div>
					</div>
				  </div>
				  <div class="mt-6 pt-4 pb-64 px-4 text-white bg-first/40">
					<p>Comments</p>

					<div v-if="comments.meta.pagination.total == 0" class="px-4 text-white/70">
						<p>there are no comments</p>
					</div>

					<div class="py-2 flex flex-col gap-6">
						<div v-for="com in comments.data" class="w-full flex gap-3">
							<div>
								<img class="w-10 h-9 rounded-full object-cover border border-third" :src="'http://strapi.denalify.com'+com.attributes.avatar.data.attributes.url" alt="">
							</div>
							<div class="w-full">
								<div class="flex items-center gap-2">
									<p class="font-semibold">{{ com.attributes.user.data.attributes.firstname }} {{ com.attributes.user.data.attributes.lastname }}</p> 
									<span class="text-xs text-white/40">{{ new Date(com.attributes.createdAt).getDate() }}.{{ new Date(com.attributes.createdAt).getMonth()+1 }}.{{ new Date(com.attributes.createdAt).getFullYear() }} {{ new Date(com.attributes.createdAt).getHours() }}:{{ new Date(com.attributes.createdAt).getMinutes() }}</span>
								</div>
								<div class="text-sm w-full min-w-full px-0.5 py-0.5 rounded-xl">
									<div class="tiptap" v-html="com.attributes.content">

									</div>
								</div>
							</div>
						</div>
					</div>
				  </div>

				  <div class="bg-background border-2 border-first w-5/12 max-w-[40vw] min-w-96 h-fit fixed bottom-0 right-0 flex gap-4 px-4">
					<div class="pt-6">
						<img v-if="user.avatar" class="w-10 h-8 rounded-full object-cover border border-third" :src="'http://strapi.denalify.com'+user.avatar.url" alt="">
						<div v-else class="w-8 h-8 bg-gray-700 rounded-full flex justify-center items-center">{{ user.firstname[0] }}{{ user.lastname[0] }}</div>
					</div>
					<div class="py-4 w-full">
						<div class="commenteditor relative border-2 min-h-32 rounded-xl border-second">
							<div v-if="commentEditor" class="flex flex-wrap justify-start gap-2 bg-second/30 mb-2 py-2" >
								<button title="bold" class="px-1.5 hover:bg-second" @click="commentEditor.chain().focus().toggleBold().run()" :disabled="!commentEditor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': commentEditor.isActive('bold') }">
									<i class='bx bx-bold'></i>
								</button>
								<button title="italic" class="italic px-1.5 hover:bg-second" @click="commentEditor.chain().focus().toggleItalic().run()" :disabled="!commentEditor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': commentEditor.isActive('italic') }">
									<i class='bx bx-italic' ></i>
								</button>
								<button title="strike" class="px-1.5 line-through hover:bg-second" @click="commentEditor.chain().focus().toggleStrike().run()" :disabled="!commentEditor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': commentEditor.isActive('strike') }">
									<i class='bx bx-strikethrough' ></i>
								</button>
								<button title="code" class="px-1 hover:bg-second" @click="commentEditor.chain().focus().toggleCode().run()" :disabled="!commentEditor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': commentEditor.isActive('code') }">
									<i class='bx bx-code' ></i>
								</button>
								<div class="border border-white/50"></div>
								<button title="parapgraph" class="px-1 hover:bg-second" @click="commentEditor.chain().focus().setParagraph().run()" :class="{ 'is-active': commentEditor.isActive('paragraph') }">
									<i class='bx bx-paragraph' ></i>
								</button>
								<button title="code block" class="px-1 hover:bg-second" @click="commentEditor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': commentEditor.isActive('codeBlock') }">
									<i class='bx bx-code-block' ></i>
								</button>
							</div>
							<editor-content :editor="commentEditor" class="customscroll min-h-24 px-1 pb-1 w-full overflow-y-auto" />
							
						</div>
					</div>
					<div class="flex items-end justify-end pb-5">
						<button @click="sendComment" class="bg-third/60 px-3 py-1 rounded-xl">Send</button>
					</div>
				  </div>
			  </div>
			  
  
  
		  </div>
	</div>
</template>
  

<script lang="ts" setup>

const props = defineProps(['taskid',]);
const emit = defineEmits(['closeclicked', 'edittask', 'removetask']);

const router = useRouter();
  
let users = ref();

let task = ref();

const {data: user} = await useFetch(`http://strapi.denalify.com/api/users/me?populate=*`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
});



const {data: tasks} = await useFetch(`http://strapi.denalify.com/api/tasks/${props.taskid}?populate=board&populate=comments&populate=users&populate[users][populate]=avatar`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
});

task.value = tasks.value.data.attributes;



const {data: comments} = await useFetch(`http://strapi.denalify.com/api/comments?populate=*&filters[task][id][$eq]=${props.taskid}&sort=createdAt`, {
	headers: {
		Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
	},
});


import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'

let desc = new Editor({
	extensions: [
        StarterKit,
		Image
    ],
    content: task.value.content,
	onBlur({ editor, event }) {
    	 console.log(editor.getHTML())
		 if (editor.getHTML() != task.value.content) {
			const tasked = useFetch(`http://strapi.denalify.com/api/tasks/${props.taskid}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
				},
				body: {
					data: {
						content: editor.getHTML()
					}
				}
			});
		 }
  	},
})



let commentEditor = new Editor({
	extensions: [
        StarterKit,
		Image
    ],
    content: `<p>Add comment</p>`,
})

let sendComment = () => {
	if (commentEditor.isEmpty == false) {
			const newComment = useFetch(`http://strapi.denalify.com/api/comments`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
				},
				body: {
					data: {
						user:  user.value.id,
						content: commentEditor.getHTML(),
						task: props.taskid,
						avatar: user.value.avatar.id
					}
				}
			});

		console.log(newComment)
	}

}


let markdone = (done) => {

	const changetaskdone = useFetch(`http://strapi.denalify.com/api/tasks/${props.taskid}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${useCookie('strapi_jwt').value}`,
		},
		body: {
			data: {
				done: !done
			}
		}
	});
	
	router.go(0)
}

</script>


<style>

.toscroll::-webkit-scrollbar {
	height: .6em;
	width: .6em;
	padding-left: 30px;
}

.toscroll::-webkit-scrollbar-track {
	background-color: #201d1d7e;
	border-radius: 1em;
}

.toscroll::-webkit-scrollbar-thumb {
	background-color: rgb(97, 71, 53);
	border-radius: 1em;
}

.toscroll::-webkit-scrollbar-thumb:hover {
	background-color: rgb(185, 137, 109);
	border-radius: 1em;
}

.taskdescription .tiptap{
	@apply min-h-96 h-full outline-0
}

.commenteditor .tiptap{
	@apply h-24 w-full outline-0
}


.customscroll::-webkit-scrollbar {
	height: .6em;
	width: .6em;
	padding-left: 30px;
}


.customscroll::-webkit-scrollbar-track {
	background-color: #201d1d7e;
	border-radius: 1em;
}

.customscroll::-webkit-scrollbar-thumb {
	background-color: rgb(97, 71, 53);
	border-radius: 1em;
}

.customscroll::-webkit-scrollbar-thumb:hover {
	background-color: rgb(185, 137, 109);
	border-radius: 1em;
}

.tiptap ul,ol {
    padding: 0 1rem;
}

.tiptap h1,h2,h3,h4,h5,h6 {
    line-height: 1.1;
}

.tiptap code {
    background-color: #978c758c;
    color: #d6d6d6;
	@apply rounded-md px-0.5
}

.tiptap pre {
    background: #29241a;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.tiptap pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
}

.tiptap img {
    max-width: 100%;
    height: auto;
}

.tiptap blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#d8d8d8, 0.1);
}

.tiptap hr {
    border: none;
    border-top: 2px solid rgba(#c2c2c2, 0.1);
    margin: 1rem 0;
}

.tiptap ul {
	@apply list-disc list-outside ml-2
}


.tiptap p {
	@apply w-fit
}
</style>