<script setup>
import { defineProps, ref, watch } from "vue"
import VueGallery from 'vue-gallery'

const props = defineProps({
    rocket: {
        type: Object,
        required: true
    },
});
const index = ref(null)
const images = props.rocket.flickr_images

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

</script>

<template>
    <div class="card" v-if="rocket != null">
        <!-- {{ JSON.stringify(rocket) }} -->
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
                    <tr v-if="rocket.name != null">
                        <td class="p-0 px-1 w-15">
                            Name:
                        </td>
                        <td class="p-0 px-1">
                            {{ rocket.name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Company:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>{{ rocket.company }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Country:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>{{ rocket.country }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Description:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>{{ rocket.description }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Engines:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>type: {{ rocket.engines.type == null ? "-" : rocket.engines.type }}</div>
                            <div>version: {{ rocket.engines.version == null ? "-" : rocket.engines.version }}</div>
                            <div>engine_loss_max: {{ rocket.engines.engine_loss_max == null ? "-" :
                                rocket.engines.engine_loss_max
                                }}</div>
                            <div>layout: {{ rocket.engines.layout == null ? "-" : rocket.engines.layout }}</div>
                            <div>propellant_1: {{ rocket.engines.propellant_1 == null ? "-" :
                                rocket.engines.propellant_1 }}
                            </div>
                            <div>propellant_2: {{ rocket.engines.propellant_2 == null ? "-" :
                                rocket.engines.propellant_2 }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Diameter:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>meters: {{ rocket.diameter.meters == null ? "-" :
                                rocket.diameter.meters }}</div>
                            <div>feet: {{ rocket.diameter.feet == null ? "-" :
                                rocket.diameter.feet }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-15">
                            Landing legs:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>{{ rocket.landing_legs.number == null ? "-" :
                                rocket.landing_legs.number }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            <div class="lh-1">
                                Payload weights:
                            </div>
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div v-for="item in rocket.payload_weights" :key="item" class="">
                                {{ item.name }} ({{ item.kg == null ? "-" : item.kg }}kg./{{ item.lb == null
                                    ? "" : item.lb }}lb.)
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            First Stage:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>
                                {{ rocket.first_stage.burn_time_sec == null ? '-' : rocket.first_stage.burn_time_sec }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16">
                            First Flight:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>
                                {{ rocket.first_flight == null ? '-' : rocket.first_flight }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0 px-1 w-16 lh-1">
                            Cost per launch:
                        </td>
                        <td class="p-0 px-1 lh-1">
                            <div>
                                {{ rocket.cost_per_launch == null ? '-' : formatter.format(rocket.cost_per_launch) }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-end">
                <a v-if="rocket.wikipedia != null" class="badge text-dark fs-16 border p-1 link me-1"
                    :href="rocket.wikipedia" target="_blank">
                    <div class="d-flex align-item-center">
                        <i class="uil uil-external-link-alt text-main me-1"></i>
                        Read More
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>