<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/produits');
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur de connexion. Veuillez vérifier vos identifiants.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center">
<<<<<<< HEAD
    <div class="neumorphic-panel w-full max-w-md p-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-text uppercase">Connexion</h1>
        <p class="text-text/70 mt-2">Accédez à votre tableau de bord</p>
=======
    <div class="glass-panel w-full max-w-md p-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white">Connexion</h1>
        <p class="text-gray-400 mt-2">Accédez à votre tableau de bord</p>
>>>>>>> 53d7e9f (first commit)
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
<<<<<<< HEAD
          <label for="email" class="block text-sm font-bold text-text mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="neumorphic-input"
=======
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="input-field"
>>>>>>> 53d7e9f (first commit)
            id="email"
            placeholder="admin@exemple.com"
            required
          />
        </div>

        <div>
<<<<<<< HEAD
          <label for="password" class="block text-sm font-bold text-text mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="neumorphic-input"
=======
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="input-field"
>>>>>>> 53d7e9f (first commit)
            id="password"
            required
          />
        </div>

<<<<<<< HEAD
        <div v-if="error" class="bg-danger/10 border border-danger/20 text-danger text-sm font-bold p-3 rounded-lg">
=======
        <div v-if="error" class="bg-danger/10 border border-danger/20 text-danger text-sm p-3 rounded-md">
>>>>>>> 53d7e9f (first commit)
          {{ error }}
        </div>

        <button
          type="submit"
<<<<<<< HEAD
          class="neumorphic-btn w-full bg-primary text-secondary"
          :disabled="loading"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
=======
          class="btn-primary w-full flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
>>>>>>> 53d7e9f (first commit)
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
