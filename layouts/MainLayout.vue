<script setup lang="ts">
import GuastHeader from "~/components/header/GuastHeader.vue"
import LoadoutContainer from "~/components/loadout/LoadoutContainer.vue"
import ArmorTable from "~/components/tables/armor/ArmorTable.vue"
import ArmorTableSkeleton from "~/components/tables/armor/ArmorTableSkeleton.vue"
import SkillTable from "~/components/tables/skills/SkillTable.vue"

const loadout = useLoadoutStore()
const { modalOpen } = storeToRefs(loadout)

function clickedOutsideModal() {
	loadout.closeModal()
}

function handleEscKey(event: any) {
	if (event.key === "Escape" && modalOpen.value === true) {
		loadout.closeModal()
	}
};

onMounted(() => {
	document.addEventListener("keyup", handleEscKey)
})

onBeforeUnmount(() => {
	document.removeEventListener("keyup", handleEscKey)
})

watch(modalOpen, (isOpen) => {
	const modal = document.getElementById("armor-modal") as HTMLDialogElement
	if (isOpen) {
		modal.showModal()
	}
	else {
		modal.close()
	}
})
</script>

<template>
	<div class="h-auto overflow-hidden">
		<header>
			<GuastHeader />
		</header>
		<main class="flex flex-col justify-center items-start p-5">
			<section class="flex w-full">
				<Suspense>
					<template #default>
						<dialog id="armor-modal" class="modal">
							<div class="flex flex-col w-[90vw] max-w-[90vw] h-auto max-h-[90vh] modal-box">
								<div class="flex justify-end w-full">
									<button class="btn-outline btn btn-error btn-sm">
										<LucideX @click="clickedOutsideModal" />
									</button>
								</div>
								<ArmorTable />
							</div>
							<form method="dialog" class="modal-backdrop" @click="clickedOutsideModal">
								<button class="cursor-default">
									close
								</button>
							</form>
						</dialog>
					</template>
					<template #fallback>
						<ArmorTableSkeleton />
					</template>
				</Suspense>
			</section>
			<section class="flex w-full">
				<LoadoutContainer />
			</section>
			<section class="flex justify-center items-start w-full mt-2">
				<SkillTable />
			</section>
		</main>
	</div>
</template>
