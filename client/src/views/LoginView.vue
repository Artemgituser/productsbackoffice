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
    <div class="neumorphic-panel w-full max-w-md p-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-text uppercase">Connexion</h1>
        <p class="text-text/70 mt-2">Accédez à votre tableau de bord</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-bold text-text mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="neumorphic-input"
            id="email"
            placeholder="admin@exemple.com"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-bold text-text mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="neumorphic-input"
            id="password"
            required
          />
        </div>

        <div v-if="error" class="bg-danger/10 border border-danger/20 text-danger text-sm font-bold p-3 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          class="neumorphic-btn w-full bg-primary text-secondary"
          :disabled="loading"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
