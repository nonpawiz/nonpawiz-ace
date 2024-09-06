<script setup>
import { RouterLink } from 'vue-router'
import { VITE_APP_NAME, VITE_APP } from '@/utils/Utils'
</script>

<template>
    <header class="card myfont rounded-0 p-0">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid py-2 d-flex justify-content-between">
                <div class="" data-bs-toggle="offcanvas" href="#offcanvasExample">
                    <i class="uil uil-bars text-main fs-25 fw-normal cursor-pointer"></i>
                </div>
                <div class="text-main">{{ VITE_APP_NAME }}</div>
                <img alt="Vue logo" class="logo p-0 m-0" src="@/assets/logo.svg" width="30" height="30" />
            </div>
        </nav>
    </header>
    <div class="offcanvas offcanvas-start" style="border-radius: 0 20px 20px 0; width: 16rem;" tabIndex="-1"
        id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header mb-0 p-5 py-2">
            <div class="logo p-0 d-flex align-items-center">
                <img alt="Vue logo" class="p-0 m-0 me-1" src="@/assets/logo.svg" width="30" height="30" />
                <div class="lh-1">
                    <span class="text-main fs-25">{{ VITE_APP }}</span><br>
                    <span class="text-main fs-16">{{ VITE_APP_NAME }}</span>
                </div>
            </div>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div style="border-top: 1px solid #ddd" class="mx-2"></div>
        <div class="offcanvas-body px-5">

            <div class="mb-3">
                <RouterLink to="/" class=" text-main fs-22 d-flex align-items-center">
                    Home
                </RouterLink>
            </div>
        </div>
    </div>
</template>
