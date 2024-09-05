<script setup>
import { defineProps, ref, watch } from "vue"
import VueGallery from 'vue-gallery'
import { GoogleMap, Marker } from 'vue3-google-map'

const props = defineProps({
    launchPad: {
        type: Object,
        required: true
    }
});

const index = ref(null)
const images = props.launchPad.images.large
const { latitude = 0, longitude = 0 } = props.launchPad
const center = { lat: latitude, lng: longitude }
console.log("center", center);
</script>

<template>
    <div class="card mb-2" v-if="launchPad != null">
        <div class="p-2">
            <div v-if="images.length > 0">
                <VueGallery :images="images" :index="index" @close="index = null"></VueGallery>
                <div class="d-flex mb-1" style="width: 100%; overflow-x: scroll;">
                    <div class="me-2" v-for="(image, imageIndex) in images" :key="imageIndex"
                        @click="index = imageIndex">
                        <img class="rounded cursor-pointer link mb-1" :src="image"
                            style="width: 150px; height: 100px; object-fit: cover;" alt="">
                    </div>
                </div>
            </div>
            <table class="table mb-1 table-bordered">
                <tbody>
                    <tr>
                        <td class="p-0 px-1 w-18">Name:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.name == null ? '-' : launchPad.name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Full name:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.full_name == null ? '-' : launchPad.full_name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Locality:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.locality == null ? '-' : launchPad.locality }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Region:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.region == null ? '-' : launchPad.region }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Launch attempts:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.launch_attempts == null ? '-' : launchPad.launch_attempts }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Launch successes:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.launch_successes == null ? '-' : launchPad.launch_successes }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-18">Status:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            {{ launchPad.status == null ? '-' : launchPad.status }}
                        </td>
                    </tr>

                </tbody>
            </table>
            <GoogleMap api-key="AIzaSyAKEPDIBccop54N_dW9KJq23JtvRjqzoaQ" class="rounded" style="width: 100%; height: 500px"
                :center="center" :zoom="15" mapTypeId="hybrid">
                <Marker :options="{ position: center }" />
            </GoogleMap>
        </div>
    </div>
</template>