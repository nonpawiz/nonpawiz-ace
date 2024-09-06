<script setup>
import VueGallery from 'vue-gallery'
import { defineProps, ref, watch } from "vue"
import Rocket from '@/components/Home/Rocket.vue'
import Launch from '@/components/Home/Launch.vue'
import LaunchPad from '@/components/Home/LaunchPad.vue'
import Crew from '@/components/Home/Crew.vue'

const props = defineProps({
    selected: String,
    launch: {
        type: Object,
        required: true
    },
    launchPad: {
        type: Object,
        required: true
    },
    rocket: {
        type: Object,
        required: true
    },
    crew: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div v-if="launch != null">
        <div class="p-0 my-0 mt-2 tab-content">
            <Launch v-if="selected == `Launch`" :launch="launch" :rocket="rocket" />
            <LaunchPad v-if="selected == `LaunchPad`" :launchPad="launchPad" />
            <Rocket v-if="selected == `Rocket`" :rocket="rocket" />
            <Crew v-if="selected == `Crew`" :crew="crew" />
        </div>
    </div>
</template>