<script setup>
import { ref, watch } from "vue"
import VueGallery from 'vue-gallery'
import VLazyImage from "v-lazy-image";

const props = defineProps({
    launch: {
        type: Object,
        required: true
    },
    rocket: {
        type: Object,
        required: true
    },
});
const index = ref(null)
const images = props.launch.links.flickr.original

</script>

<template>
    <div class="card" v-if="launch != null">
        <div class="p-2">
            <div v-if="images.length > 0">
                <VueGallery :images="images" :index="index" @close="index = null"></VueGallery>
                <div class="d-flex mb-1" style="width: 100%; overflow-x: scroll;">
                    <div class="me-2" v-for="(image, imageIndex) in images" :key="imageIndex"
                        @click="index = imageIndex">
                        <img class="rounded cursor-pointer link mb-1" :src="image"
                            style="width: 150px; height: 100px; object-fit: cover;" alt="" />
                    </div>
                </div>
            </div>
            <table class="table mb-1 table-bordered">
                <tbody>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            Mission Name:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launch.name == null ? '-' : launch.name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            Details:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launch.details == null ? '-' : launch.details }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            DateTime:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launch.date_local == null ? '-' : launch.date_local }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            Rocket:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ rocket.name == null ? '-' : rocket.name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            <div class="lh-1">
                                Failures:
                            </div>
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div v-if="launch.failures.length == 0">-</div>
                            <div v-for="item in launch.failures" :key="item">
                                (time:{{ item.time }}) {{ item.reason }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>