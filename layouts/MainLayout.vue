<script setup>
import GuastHeader from "~/components/header/GuastHeader.vue"
import LoadoutContainer from "~/components/loadout/LoadoutContainer.vue"
import ArmorTable from "~/components/tables/armor/ArmorTable.vue"
import ArmorTableSkeleton from "~/components/tables/armor/ArmorTableSkeleton.vue"
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
						<ArmorTable />
					</template>
					<template #fallback>
						<ArmorTableSkeleton />
					</template>
				</Suspense>
			</section>
			<section>
				<LoadoutContainer />
			</section>
			<section class="flex w-full h-100 justify-center items-center" />
		</main>
	</div>
</template>
