<script setup>
import { watchEffect, onMounted, ref, watch } from 'vue';
import '@/assets/custom.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { convertToThaiTimeZone, getFetch, VITE_APP_NAME } from '@/utils/Utils'
import Detail from '@/components/Home/Detail.vue'
import Loader from '@/utils/Loader.vue';

const loading = ref(true)
const launches = ref([]);
const launch_id = ref('');
const searchField = ["crews", "name"];
const sortType = ["desc", "asc"];
const searchInput = ref('');
const searchValue = ref('');
const headers = [
    { text: 'Image', value: 'picture' },
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Date (Asia/Bangkok)', value: 'date_local', sortable: true },
    { text: 'No. of Crew', value: 'crews', sortable: true },
    { text: 'Detail', value: 'detail' },
];

const loadIntroduction = async (index) => {
    const expandedItem = launches[index];
    await new Promise((s) => setTimeout(s, 1000));
};

const viewId = (id) => {
    launch_id.value = id
}

const getData = async () => {
    try {
        loading.value = true
        const getLaunches = await getFetch(`https://api.spacexdata.com/v4/launches`)
        getLaunches.forEach((item, index) => {
            getLaunches[index].crews = item.crew.length
            getLaunches[index].expend = {
                rocket: item.rocket,
                details: item.details,
                failures: item.failures,
            }
        })
        // console.log("getLaunches", getLaunches)
        await new Promise((s) => setTimeout(s, 500))
        launches.value = getLaunches
        loading.value = false
    } catch (err) {
        console.log("err", err)
    }
}

watch(() => searchInput.value, (current, prev) => {
    // console.log("current", current);
    const cleanedString = current.replace(/[^a-zA-Z0-9]/g, "")
    searchValue.value = cleanedString
    searchInput.value = cleanedString


})

onMounted(() => {
    getData()
})

</script>

<template>
    <div class="container py-4">
        <div v-if="loading" class="loader-content loader-center" style=" position: absolute">
            <Loader />
        </div>
        <div v-else class="card" style="border-width: .5px;">
            <div class="p-2">
                <div class="row">
                    <div class="col-md-8">
                        <span class="fs-35 text-main">
                            {{ VITE_APP_NAME }}
                        </span>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating mb-3">
                            <input class="form-control fs-22 rounded" placeholder="โปรดเลือก" v-model="searchInput" />
                            <label class="fs-18" htmlFor="">
                                Search...
                            </label>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="p-2">
                        <Vue3EasyDataTable :headers="headers" :items="launches" :search-field="searchField"
                            :sort-type="sortType" :search-value="searchValue" table-class-name="customize-table"
                            show-index @expand-row="loadIntroduction">
                            <template #header-crews="header">
                                <div class="badge text-dark p-0">
                                    No. of Crew
                                </div>
                            </template>
                            <template #item-date_local="{ date_local }">
                                {{ convertToThaiTimeZone(date_local) }}
                            </template>
                            <template #item-detail="{ id }">
                                <div class="badge btn bg-green border-0 p-1" data-bs-toggle="modal" href="#ModalDetail"
                                    @click="viewId(id)">
                                    <i class=" uil uil-eye fw-normal"></i>
                                    View
                                </div>
                            </template>
                            <template #item-picture="{ links }">
                                <img v-if="links.patch.small != null" :src="links.patch.small" class="p-2" alt="Image"
                                    style="width: 80px; height: 80px;">
                                <img v-else src="@/assets/no-image.png" class="p-2" alt="Image"
                                    style="width: 80px; height: 80px;">
                            </template>
                            <template #expand="{ links }">
                                <div class="card m-1">
                                    <div class="p-2">
                                        <a v-if="links.article != null"
                                            class="badge text-dark fs-16 border p-1 link me-1" :href="links.article"
                                            target="_blank">
                                            <div class="d-flex align-item-center">
                                                <i class="uil uil-external-link-alt text-main me-1"></i>
                                                Read
                                            </div>
                                        </a>
                                        <a v-if="links.wikipedia != null"
                                            class="badge text-dark fs-16 border p-1 link me-1" :href="links.wikipedia"
                                            target="_blank">
                                            <div class="d-flex align-item-center">
                                                <i class="uil uil-globe p-0 text-main me-1"></i>
                                                Wikipedia
                                            </div>
                                        </a>
                                        <a v-if="links.webcast != null"
                                            class="badge text-dark fs-16 border p-1 link me-1" :href="links.webcast"
                                            target="_blank">
                                            <div class="d-flex align-item-center">
                                                <i class="uil uil-youtube p-0 text-red me-1"></i>
                                                Youtube
                                            </div>
                                        </a>
                                        <a v-if="links.reddit.media != null"
                                            class="badge text-dark fs-16 border p-1 link me-1"
                                            :href="links.reddit.media" target="_blank">
                                            <div class="d-flex align-item-center">
                                                <i class="uil uil-reddit-alien-alt p-0 text-red"></i>
                                                Reddit
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </template>
                        </Vue3EasyDataTable>
                    </div>
                </div>
            </div>
            <Detail :launch_id="launch_id" />
        </div>
    </div>
</template>
