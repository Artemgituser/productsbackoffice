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
    const response = await api.get('/categories');
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
      await api.put(`/categories/${categoryForm.id}`, categoryForm);
    } else {
      await api.post('/categories', categoryForm);
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
    await api.delete(`/categories/${id}`);
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
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-text mb-1">Catégories</h1>
        <p class="text-text/70">Gérez les catégories de vos produits</p>
      </div>
      <button @click="openAddModal" class="neumorphic-btn bg-primary text-secondary">
        Nouvelle catégorie
      </button>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
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
    </div>

    <!-- Category Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
      <div class="neumorphic-panel w-full max-w-md p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text">{{ isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie' }}</h2>
          <button @click="closeModal" class="neumorphic-btn p-2 text-text/70">✕</button>
        </div>

        <form @submit.prevent="saveCategory" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-text mb-1">Nom de la catégorie</label>
            <input v-model="categoryForm.nom" type="text" class="neumorphic-input" required />
          </div>

          <div v-if="formError" class="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm font-bold">
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 mt-4">
            <button type="button" @click="closeModal" class="neumorphic-btn bg-surface text-text">
              Annuler
            </button>
            <button type="submit" class="neumorphic-btn bg-primary text-secondary" :disabled="formLoading">
              {{ isEditing ? 'Mettre à jour' : 'Créer la catégorie' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
