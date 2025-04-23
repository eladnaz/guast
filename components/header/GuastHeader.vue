<script setup lang="ts">
import ThemeToggle from "~/components/header/ThemeToggle.vue"
</script>

<template>
	<div class="w-screen px-10 py-6 bg-base-300 shadow">
		<nav class="flex h-full items-center justify-between">
			<div class="text-xl font-bold">
				MHGU Armor Set Tool
			</div>
			<ThemeToggle />
		</nav>
	</div>
</template>
