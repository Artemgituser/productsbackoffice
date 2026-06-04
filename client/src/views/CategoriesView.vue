<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/api';

const categories = ref([]);
const loading = ref(true);
const error = ref(null);

// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const formLoading = ref(false);
const formError = ref('');
const categoryForm = reactive({
  id: null,
  nom: ''
});

const fetchCategories = async () => {
  loading.value = true;
  try {
<<<<<<< HEAD
    const response = await api.get('/categories');
=======
    const response = await api.get('/api/categories');
>>>>>>> 53d7e9f (first commit)
    categories.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des catégories.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  isEditing.value = false;
  categoryForm.id = null;
  categoryForm.nom = '';
  showModal.value = true;
};

const openEditModal = (category) => {
  isEditing.value = true;
  categoryForm.id = category.id;
  categoryForm.nom = category.nom;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formError.value = '';
};

const saveCategory = async () => {
  formLoading.value = true;
  formError.value = '';
  try {
    if (isEditing.value) {
<<<<<<< HEAD
      await api.put(`/categories/${categoryForm.id}`, categoryForm);
    } else {
      await api.post('/categories', categoryForm);
=======
      await api.put(`/api/categories/${categoryForm.id}`, categoryForm);
    } else {
      await api.post('/api/categories', categoryForm);
>>>>>>> 53d7e9f (first commit)
    }
    await fetchCategories();
    closeModal();
  } catch (err) {
    formError.value = err.response?.data?.message || "Erreur lors de l'enregistrement.";
  } finally {
    formLoading.value = false;
  }
};

const deleteCategory = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Cela pourrait affecter les produits associés.')) return;
  try {
<<<<<<< HEAD
    await api.delete(`/categories/${id}`);
=======
    await api.delete(`/api/categories/${id}`);
>>>>>>> 53d7e9f (first commit)
    await fetchCategories();
  } catch (err) {
    alert("Erreur lors de la suppression.");
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
<<<<<<< HEAD
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-text mb-1">Catégories</h1>
        <p class="text-text/70">Gérez les catégories de vos produits</p>
      </div>
      <button @click="openAddModal" class="neumorphic-btn bg-primary text-secondary">
=======
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-white mb-1">Catégories</h1>
        <p class="text-gray-400">Gérez les catégories de vos produits</p>
      </div>
      <button @click="openAddModal" class="btn-primary flex items-center gap-2 self-start md:self-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
>>>>>>> 53d7e9f (first commit)
        Nouvelle catégorie
      </button>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
<<<<<<< HEAD
      <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-text/70">Chargement des catégories...</p>
    </div>

    <div v-else-if="error" class="bg-danger/10 border border-danger/20 text-danger p-4 rounded-xl">
      {{ error }}
    </div>

    <div v-else class="neumorphic-panel max-w-2xl overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-text/10">
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest">ID</th>
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest">Nom</th>
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text/10">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 text-sm font-bold text-text/50 font-mono">#{{ category.id }}</td>
            <td class="px-6 py-4 text-sm font-bold text-text">{{ category.nom }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openEditModal(category)" class="neumorphic-btn p-2 text-primary">✎</button>
              <button @click="deleteCategory(category.id)" class="neumorphic-btn p-2 text-danger">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
=======
      <svg class="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-400">Chargement des catégories...</p>
    </div>

    <div v-else-if="error" class="bg-danger/10 border border-danger/20 text-danger p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="categories.length === 0" class="glass-panel flex flex-col items-center justify-center py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="text-xl font-medium text-gray-300">Aucune catégorie trouvée</p>
      </div>

      <div v-else class="glass-panel max-w-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-white/5 border-b border-white/10">
                <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="category in categories" :key="category.id" class="hover:bg-white/5 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-400 font-mono">#{{ category.id }}</td>
                <td class="px-6 py-4 text-sm font-medium text-white">{{ category.nom }}</td>
                <td class="px-6 py-4 text-sm text-right space-x-2">
                  <button @click="openEditModal(category)" class="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button @click="deleteCategory(category.id)" class="p-1.5 rounded-md text-gray-400 hover:text-danger hover:bg-danger/10 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
>>>>>>> 53d7e9f (first commit)
    </div>

    <!-- Category Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
<<<<<<< HEAD
      <div class="neumorphic-panel w-full max-w-md p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text">{{ isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie' }}</h2>
          <button @click="closeModal" class="neumorphic-btn p-2 text-text/70">✕</button>
=======
      <div class="glass-panel w-full max-w-md p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">{{ isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
>>>>>>> 53d7e9f (first commit)
        </div>

        <form @submit.prevent="saveCategory" class="space-y-6">
          <div>
<<<<<<< HEAD
            <label class="block text-sm font-bold text-text mb-1">Nom de la catégorie</label>
            <input v-model="categoryForm.nom" type="text" class="neumorphic-input" required />
          </div>

          <div v-if="formError" class="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm font-bold">
=======
            <label class="block text-sm font-medium text-gray-300 mb-1">Nom de la catégorie</label>
            <input v-model="categoryForm.nom" type="text" class="input-field" required />
          </div>

          <div v-if="formError" class="bg-danger/10 border border-danger/20 text-danger p-3 rounded text-sm">
>>>>>>> 53d7e9f (first commit)
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 mt-4">
<<<<<<< HEAD
            <button type="button" @click="closeModal" class="neumorphic-btn bg-surface text-text">
              Annuler
            </button>
            <button type="submit" class="neumorphic-btn bg-primary text-secondary" :disabled="formLoading">
=======
            <button type="button" @click="closeModal" class="px-6 py-2 rounded font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              Annuler
            </button>
            <button type="submit" class="btn-primary px-8" :disabled="formLoading">
              <svg v-if="formLoading" class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
>>>>>>> 53d7e9f (first commit)
              {{ isEditing ? 'Mettre à jour' : 'Créer la catégorie' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
