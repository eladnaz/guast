<script setup lang="ts">
const props = defineProps<{
    iconString:string;
    resValue:number;
    textColorClass:string;
    altText:string;
}>();
</script>
<template>
    <div class="flex flex-col items-center pr-1">
        <img
        :src="props.iconString"
        :alt="props.altText"
        width="16"
        height="16"
        class="mr-1"
        >
        <span :class="props.textColorClass">
        {{ props.resValue }}
        </span>
    </div>
</template>