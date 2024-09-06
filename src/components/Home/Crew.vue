<script setup>
import { defineProps, ref, watch } from "vue"
const props = defineProps({
    crew: {
        type: Object,
        required: true
    }
});
const index = ref(null)
const images = props.crew.length == 0 ? [] : props.crew.map((i) => { return i.image })
// console.log("images", images)
</script>

<template>
    <div class="row" v-if="crew.length > 0">
        <div class="col-6 col-sm-6 col-md-6" v-for="(item, oindex) in crew" :key="item">
            <div class="card p-2 mb-2">
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-lg-4">
                        <img class="rounded link mb-1" :src="item.image" @click="index = oindex"
                            style="width: 100%; height: 150px; object-fit: cover; object-position: top" alt="">
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-8 lh-1">
                        <div class="fs-25 text-main">{{ item.name }}</div>
                        <div class="card w-100 rounded-2">
                            <div class="p-2">
                                <div class="row fs-18 text-dark">
                                    <div class="">
                                        <div>Agency: {{ item.agency }}</div>
                                        <div>Status: {{ item.status }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div v-if="images.length > 0">
                    <VueGallery :images="images" :index="index" @close="index = null"></VueGallery>
                </div> -->
            </div>
        </div>
    </div>
    <div v-else class="text-secondary d-flex align-items-center justify-content-center" style="height: 70vh">No crew
    </div>
</template>