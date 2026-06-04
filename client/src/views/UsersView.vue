<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/api';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const users = ref([]);
const loading = ref(true);
const error = ref(null);

// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const formLoading = ref(false);
const formError = ref('');
const userForm = reactive({
  id: null,
  email: '',
  password: '',
  role: 'editor'
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await api.get('/users');
    users.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des utilisateurs.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  isEditing.value = false;
  userForm.id = null;
  userForm.email = '';
  userForm.password = '';
  userForm.role = 'editor';
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditing.value = true;
  userForm.id = user.id;
  userForm.email = user.email;
  userForm.password = ''; 
  userForm.role = user.role;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formError.value = '';
};

const saveUser = async () => {
  formLoading.value = true;
  formError.value = '';
  try {
    if (isEditing.value) {
      await api.put(`/users/${userForm.id}`, userForm);
    } else {
      await api.post('/users', userForm);
    }
    await fetchUsers();
    closeModal();
  } catch (err) {
    formError.value = err.response?.data?.message || "Erreur lors de l'enregistrement.";
  } finally {
    formLoading.value = false;
  }
};

const deleteUser = async (id) => {
  if (id === authStore.user?.id) {
    alert("Vous ne pouvez pas supprimer votre propre compte.");
    return;
  }
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
  try {
    await api.delete(`/users/${id}`);
    await fetchUsers();
  } catch (err) {
    alert("Erreur lors de la suppression.");
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-text mb-1 uppercase">Utilisateurs</h1>
        <p class="text-text/70">Contrôle des accès système</p>
      </div>
      <button @click="openAddModal" class="neumorphic-btn bg-primary text-secondary">
        AJOUTER
      </button>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-text/70 font-mono">SYNCHRONISATION...</p>
    </div>

    <div v-else-if="error" class="bg-danger/10 border border-danger/20 text-danger p-4 rounded-xl">
      {{ error }}
    </div>

    <div v-else class="neumorphic-panel overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-text/10">
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest">Identifiant</th>
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest">Privilèges</th>
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text/10">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 text-sm font-bold text-text">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span :class="['px-3 py-1 rounded-lg text-[10px] font-bold uppercase', user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-text/10 text-text/60']">
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openEditModal(user)" class="neumorphic-btn p-2 text-primary">✎</button>
              <button v-if="authStore.user?.role === 'admin'" @click="deleteUser(user.id)" class="neumorphic-btn p-2 text-danger">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
      <div class="neumorphic-panel w-full max-w-md p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text uppercase">{{ isEditing ? 'ÉDITION' : 'CRÉATION' }}</h2>
          <button @click="closeModal" class="neumorphic-btn p-2 text-text/70">✕</button>
        </div>
        <form @submit.prevent="saveUser" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-text mb-1">Email</label>
            <input v-model="userForm.email" type="email" class="neumorphic-input" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-text mb-1">{{ isEditing ? 'Nouveau Mot de Passe' : 'Mot de Passe' }}</label>
            <input v-model="userForm.password" type="password" class="neumorphic-input" :required="!isEditing" />
          </div>
          <div>
            <label class="block text-sm font-bold text-text mb-1">Rôle</label>
            <select v-model="userForm.role" class="neumorphic-input bg-surface">
              <option value="editor">EDITOR</option>
              <option value="admin">ADMIN</option>
            </select>
          </div>
          <div v-if="formError" class="text-danger text-sm font-bold">{{ formError }}</div>
          <div class="flex justify-end gap-3 mt-4">
            <button type="button" @click="closeModal" class="neumorphic-btn bg-surface text-text">RETOUR</button>
            <button type="submit" class="neumorphic-btn bg-primary text-secondary" :disabled="formLoading">{{ isEditing ? 'UPDATE' : 'VALIDER' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>