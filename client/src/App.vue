<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
<<<<<<< HEAD
  <div class="min-h-screen bg-surface text-text font-sans">
    <nav class="sticky top-0 z-50 p-4" v-if="authStore.token">
      <div class="max-w-7xl mx-auto">
        <div class="neumorphic-panel flex items-center justify-between h-16 px-8">
          <RouterLink class="text-xl font-bold text-primary uppercase" to="/">
            Backoffice
          </RouterLink>
          <div class="flex items-center space-x-6">
            <RouterLink 
              to="/" 
              class="font-bold transition-all duration-300"
              active-class="text-primary"
            >
              Dashboard
            </RouterLink>
            <RouterLink 
              to="/produits" 
              class="font-bold transition-all duration-300"
              active-class="text-primary"
            >
              Produits
            </RouterLink>
            <RouterLink 
              to="/categories" 
              class="font-bold transition-all duration-300"
              active-class="text-primary"
            >
              Catégories
            </RouterLink>
            <RouterLink 
            
              to="/users" 
              class="font-bold transition-all duration-300"
              active-class="text-primary"
            >
              Utilisateurs
            </RouterLink>
          </div>
          <button 
            @click="handleLogout"
            class="neumorphic-btn text-danger"
          >
            Déconnexion
          </button>
=======
  <div class="min-h-screen bg-surface text-text">
    <nav class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/10" v-if="authStore.token">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <RouterLink class="text-xl font-bold tracking-tight text-primary hover:text-white transition-colors" to="/">
              Dashboard
            </RouterLink>
            <div class="hidden md:flex items-center space-x-4">
              <RouterLink 
                to="/produits" 
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                active-class="bg-primary/20 text-primary"
              >
                Produits
              </RouterLink>
              <RouterLink 
                to="/categories" 
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                active-class="bg-primary/20 text-primary"
              >
                Catégories
              </RouterLink>
            </div>
          </div>
          <div class="flex items-center">
            <button 
              @click="handleLogout"
              class="btn-danger-outline text-sm py-1.5 px-3"
            >
              Déconnexion
            </button>
          </div>
>>>>>>> 53d7e9f (first commit)
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Base styles are in style.css */
</style>
