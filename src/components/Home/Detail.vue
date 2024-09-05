<script setup>
import { defineProps, ref, watch, onMounted } from "vue"
import DetailTabContent from '@/components/Home/DetailTabContent.vue'
import { getFetch } from '@/utils/Utils'
import Loader from "@/utils/Loader.vue"

const props = defineProps({
    launch_id: {
        type: String,
        required: true
    }
});

const loading = ref(true);
const crewData = ref([]);
const selected = ref('Launch')
const launch = ref(null);
const launchPad = ref(null);
const crew = ref(null);
const rocket = ref(null);

watch(
    () => props.launch_id,
    (new_launch_id, pre_launch_id) => {
        getData(new_launch_id)
    }
);

onMounted(() => {
    getCrew()
})

const select = (menu) => {
    selected.value = menu;
}

const getCrew = async () => {
    const getCrew = await getFetch(`https://api.spacexdata.com/v4/crew`)
    console.log("getCrew", getCrew)
    crewData.value = getCrew
}

const getData = async (id) => {
    try {
        loading.value = true
        const getLaunch = await getFetch(`https://api.spacexdata.com/v4/launches/${id}`)
        const getLaunchPad = await getFetch(`https://api.spacexdata.com/v4/launchpads/${getLaunch.launchpad}`)
        const getRocket = await getFetch(`https://api.spacexdata.com/v4/rockets/${getLaunch.rocket}`)
        let getCrew = [];
        if (getLaunch.crew.length > 0) {
            getCrew = crewData.value.filter((i) => {
                return getLaunch.crew.includes(i.id)
            })
        }

        console.log('getLaunch', getLaunch);
        console.log('getLaunchPad', getLaunchPad);
        console.log('getRocket', getRocket);
        console.log('getCrew', getCrew);

        launch.value = getLaunch
        launchPad.value = getLaunchPad
        rocket.value = getRocket
        crew.value = getCrew

        // await new Promise((s) => setTimeout(s, 500))
        loading.value = false
    } catch (err) {
        console.log("err", err)
    }
}
</script>

<template>
    <div class="modal fade p-0 m-0" id="ModalDetail" tabIndex="-1" data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" style="width: 90wh;">
            <div class="modal-content text-start rounded" style="height: auto; max-height: 90vh;">
                <div class="modal-header p-0" style="display: unset">
                    <div class="px-4 mb-0">
                        <div class="fs-35 p-0 text-main d-flex align-items-center">
                            <i class="uil uil-info-circle me-1 fs-20"></i>{{ launch == null ? "" : launch.name }}
                        </div>
                        <div class="nav nav-tabs nav-tabs-basic m-0 p-0">
                            <div class="row m-0 p-0 m-0 w-100">
                                <div class="nav-item col-sm-3 mb-0 p-0">
                                    <a class="nav-link cursor-pointer active p-0 fs-25" data-bs-toggle="tab"
                                        @click="select(`Launch`)">
                                        Launch
                                    </a>
                                </div>
                                <div class="nav-item col-sm-3 mb-0 p-0">
                                    <a class="nav-link cursor-pointer p-0 fs-25" data-bs-toggle="tab"
                                        @click="select(`LaunchPad`)">
                                        Launch pad
                                    </a>
                                </div>
                                <div class="nav-item col-sm-3 mb-0 p-0 ">
                                    <a class="nav-link cursor-pointer fs-25 p-0" data-bs-toggle="tab"
                                        @click="select(`Rocket`)">
                                        Rocket
                                    </a>
                                </div>
                                <div class="nav-item col-sm-3 mb-0 p-0 ">
                                    <a class="nav-link cursor-pointer fs-25 p-0" data-bs-toggle="tab"
                                        @click="select(`Crew`)">
                                        Crew
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="hidden_modal" class="btn-close" style="z-index: 999999;" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body p-0 px-3 text-main" style="height: 80vh; overflow-y: scroll">
                    <div v-if="loading" class="loader-content loader-center" style=" position: absolute">
                        <Loader />
                    </div>
                    <div v-else>
                        <DetailTabContent :launch="launch" :rocket="rocket" :launchPad="launchPad" :crew="crew"
                            :selected="selected" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
