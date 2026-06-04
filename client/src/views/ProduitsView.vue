<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import api from '@/api';

const produits = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const sortBy = ref('nom');
const sortOrder = ref('asc');
<<<<<<< HEAD
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal state
// ... existing modal state code ...
=======

// Modal state
>>>>>>> 53d7e9f (first commit)
const showModal = ref(false);
const isEditing = ref(false);
const formLoading = ref(false);
const formError = ref('');
const productForm = reactive({
  id: null,
  nom: '',
  prix: 0,
  stock: 0,
  description: '',
  categorieId: '',
  image: ''
});

const fetchProduits = async () => {
  loading.value = true;
  try {
<<<<<<< HEAD
    const response = await api.get('/produits');
=======
    const response = await api.get('/api/produits');
>>>>>>> 53d7e9f (first commit)
    produits.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des produits.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
<<<<<<< HEAD
    const response = await api.get('/categories');
=======
    const response = await api.get('/api/categories');
>>>>>>> 53d7e9f (first commit)
    categories.value = response.data;
  } catch (err) {
    console.error("Erreur catégories:", err);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  productForm.id = null;
  productForm.nom = '';
  productForm.prix = 0;
  productForm.stock = 0;
  productForm.description = '';
  productForm.categorieId = '';
  productForm.image = '';
  showModal.value = true;
};

const openEditModal = (produit) => {
  isEditing.value = true;
  productForm.id = produit.id;
  productForm.nom = produit.nom;
  productForm.prix = produit.prix;
  productForm.stock = produit.stock;
  productForm.description = produit.description;
  productForm.categorieId = produit.categorieId || '';
  productForm.image = produit.image || '';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formError.value = '';
};

const saveProduct = async () => {
  formLoading.value = true;
  formError.value = '';
  try {
    if (isEditing.value) {
<<<<<<< HEAD
      await api.put(`/produits/${productForm.id}`, productForm);
    } else {
      await api.post('/produits', productForm);
=======
      await api.put(`/api/produits/${productForm.id}`, productForm);
    } else {
      await api.post('/api/produits', productForm);
>>>>>>> 53d7e9f (first commit)
    }
    await fetchProduits();
    closeModal();
  } catch (err) {
    formError.value = err.response?.data?.message || "Erreur lors de l'enregistrement.";
  } finally {
    formLoading.value = false;
  }
};

const deleteProduct = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
  try {
<<<<<<< HEAD
    await api.delete(`/produits/${id}`);
=======
    await api.delete(`/api/produits/${id}`);
>>>>>>> 53d7e9f (first commit)
    await fetchProduits();
  } catch (err) {
    alert("Erreur lors de la suppression.");
  }
};

const filteredAndSortedProduits = computed(() => {
  let result = [...produits.value];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.nom.toLowerCase().includes(query) || 
      p.description?.toLowerCase().includes(query) ||
      p.Categorie?.nom?.toLowerCase().includes(query)
    );
  }

  // Sorting
  result.sort((a, b) => {
    let modifier = sortOrder.value === 'desc' ? -1 : 1;
    let valA = a[sortBy.value];
    let valB = b[sortBy.value];
    
    // Handle nested sorting for Categorie
    if (sortBy.value === 'Categorie.nom') {
      valA = a.Categorie?.nom || '';
      valB = b.Categorie?.nom || '';
    }

    if (valA < valB) return -1 * modifier;
    if (valA > valB) return 1 * modifier;
    return 0;
  });

  return result;
});

<<<<<<< HEAD
const paginatedProduits = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedProduits.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedProduits.value.length / itemsPerPage);
});

=======
>>>>>>> 53d7e9f (first commit)
const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
<<<<<<< HEAD
  currentPage.value = 1; // Reset to first page on sort
};

// Reset to first page on search
import { watch } from 'vue';
watch(searchQuery, () => {
  currentPage.value = 1;
});

=======
};

>>>>>>> 53d7e9f (first commit)
const exportCSV = () => {
  const headers = ['ID', 'Nom', 'Prix', 'Stock', 'Catégorie'];
  const rows = filteredAndSortedProduits.value.map(p => [
    p.id,
    p.nom,
    p.prix,
    p.stock,
    p.Categorie?.nom || 'N/A'
  ]);
  
  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "produits_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  fetchProduits();
  fetchCategories();
});
</script>

<template>
<<<<<<< HEAD
  <div class="space-y-8">
    <!-- Header & Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-text mb-1">Produits</h1>
        <p class="text-text/70">Gérez votre inventaire de produits</p>
      </div>
      <div class="flex gap-4">
        <button @click="exportCSV" class="neumorphic-btn bg-surface text-text hover:text-danger">
          Exporter CSV
        </button>
        <button @click="openAddModal" class="neumorphic-btn bg-primary text-secondary">
=======
  <div class="space-y-6">
    <!-- Header & Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-white mb-1">Produits</h1>
        <p class="text-gray-400">Gérez votre inventaire de produits</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportCSV" class="btn-danger-outline flex items-center gap-2 border-white/20 text-white hover:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Exporter CSV
        </button>
        <button @click="openAddModal" class="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
>>>>>>> 53d7e9f (first commit)
          Nouveau produit
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="relative max-w-md">
<<<<<<< HEAD
=======
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </span>
>>>>>>> 53d7e9f (first commit)
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un produit..."
<<<<<<< HEAD
        class="neumorphic-input pl-12"
      />
      <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/50">
        🔍
      </span>
=======
        class="input-field pl-10"
      />
>>>>>>> 53d7e9f (first commit)
    </div>

    <!-- Table -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
<<<<<<< HEAD
      <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-text/70">Chargement des produits...</p>
    </div>

    <div v-else-if="error" class="bg-danger/10 border border-danger/20 text-danger p-4 rounded-xl">
      {{ error }}
    </div>

    <div v-else class="neumorphic-panel overflow-hidden">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-text/10">
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest">Img</th>
            <th @click="toggleSort('nom')" class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest cursor-pointer hover:text-primary">Nom</th>
            <th @click="toggleSort('Categorie.nom')" class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest cursor-pointer hover:text-primary">Catégorie</th>
            <th @click="toggleSort('prix')" class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest cursor-pointer hover:text-primary">Prix</th>
            <th @click="toggleSort('stock')" class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest cursor-pointer hover:text-primary">Stock</th>
            <th class="px-6 py-4 text-xs font-bold text-text/50 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-text/10">
          <tr v-for="produit in paginatedProduits" :key="produit.id">
            <td class="px-6 py-4">
              <img v-if="produit.image" :src="produit.image" class="h-10 w-10 rounded-lg object-cover" />
            </td>
            <td class="px-6 py-4">
              <div class="text-sm font-bold text-text">{{ produit.nom }}</div>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-text/70">
              {{ produit.Categorie?.nom || 'N/A' }}
            </td>
            <td class="px-6 py-4 text-sm font-bold text-primary">{{ produit.prix }}€</td>
            <td class="px-6 py-4 text-sm font-bold">
              <span :class="produit.stock <= 5 ? 'text-danger' : 'text-text'">
                {{ produit.stock }}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openEditModal(produit)" class="neumorphic-btn p-2 text-primary">✎</button>
              <button @click="deleteProduct(produit.id)" class="neumorphic-btn p-2 text-danger">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Product Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
      <div class="neumorphic-panel w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text">{{ isEditing ? 'Modifier le produit' : 'Nouveau produit' }}</h2>
          <button @click="closeModal" class="neumorphic-btn p-2 text-text/70">✕</button>
=======
      <svg class="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-400">Chargement des produits...</p>
    </div>

    <div v-else-if="error" class="bg-danger/10 border border-danger/20 text-danger p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="filteredAndSortedProduits.length === 0" class="glass-panel flex flex-col items-center justify-center py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-xl font-medium text-gray-300">Aucun produit trouvé</p>
      </div>

      <div v-else class="glass-panel overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-white/5 border-b border-white/10">
                <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Img</th>
                <th @click="toggleSort('nom')" class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
                  Nom
                  <span v-if="sortBy === 'nom'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                </th>
                <th @click="toggleSort('Categorie.nom')" class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white">Catégorie</th>
                <th @click="toggleSort('prix')" class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white">Prix</th>
                <th @click="toggleSort('stock')" class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white">Stock</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="produit in filteredAndSortedProduits" :key="produit.id" class="hover:bg-white/5 transition-colors">
                <td class="px-6 py-4">
                  <img v-if="produit.image" :src="produit.image" class="h-10 w-10 rounded object-cover border border-white/10" />
                  <div v-else class="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-white">{{ produit.nom }}</div>
                  <div class="text-xs text-gray-500 truncate max-w-[200px]">{{ produit.description }}</div>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {{ produit.Categorie?.nom || 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-success font-semibold">{{ produit.prix }}€</td>
                <td class="px-6 py-4 text-sm">
                  <span :class="produit.stock <= 5 ? 'text-danger font-bold' : 'text-gray-400'">
                    {{ produit.stock }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-right space-x-2">
                  <button @click="openEditModal(produit)" class="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button @click="deleteProduct(produit.id)" class="p-1.5 rounded-md text-gray-400 hover:text-danger hover:bg-danger/10 transition-all">
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
    </div>

    <!-- Product Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
      <div class="glass-panel w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">{{ isEditing ? 'Modifier le produit' : 'Nouveau produit' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
>>>>>>> 53d7e9f (first commit)
        </div>

        <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
<<<<<<< HEAD
            <label class="block text-sm font-bold text-text mb-1">Nom du produit</label>
            <input v-model="productForm.nom" type="text" class="neumorphic-input" required />
          </div>

          <div>
            <label class="block text-sm font-bold text-text mb-1">Prix (€)</label>
            <input v-model="productForm.prix" type="number" step="0.01" class="neumorphic-input" required />
          </div>

          <div>
            <label class="block text-sm font-bold text-text mb-1">Stock</label>
            <input v-model="productForm.stock" type="number" class="neumorphic-input" required />
          </div>

          <div>
            <label class="block text-sm font-bold text-text mb-1">Catégorie</label>
            <select v-model="productForm.categorieId" class="neumorphic-input bg-surface" required>
=======
            <label class="block text-sm font-medium text-gray-300 mb-1">Nom du produit</label>
            <input v-model="productForm.nom" type="text" class="input-field" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Prix (€)</label>
            <input v-model="productForm.prix" type="number" step="0.01" class="input-field" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Stock</label>
            <input v-model="productForm.stock" type="number" class="input-field" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Catégorie</label>
            <select v-model="productForm.categorieId" class="input-field appearance-none bg-surface" required>
>>>>>>> 53d7e9f (first commit)
              <option value="">Sélectionner une catégorie</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nom }}</option>
            </select>
          </div>

          <div>
<<<<<<< HEAD
            <label class="block text-sm font-bold text-text mb-1">URL Image</label>
            <input v-model="productForm.image" type="text" class="neumorphic-input" placeholder="https://..." />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-text mb-1">Description</label>
            <textarea v-model="productForm.description" class="neumorphic-input h-24 resize-none"></textarea>
          </div>

          <div v-if="formError" class="md:col-span-2 bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm font-bold">
=======
            <label class="block text-sm font-medium text-gray-300 mb-1">URL Image</label>
            <input v-model="productForm.image" type="text" class="input-field" placeholder="https://..." />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea v-model="productForm.description" class="input-field h-24 resize-none"></textarea>
          </div>

          <div v-if="formError" class="md:col-span-2 bg-danger/10 border border-danger/20 text-danger p-3 rounded text-sm">
>>>>>>> 53d7e9f (first commit)
            {{ formError }}
          </div>

          <div class="md:col-span-2 flex justify-end gap-3 mt-4">
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
              {{ isEditing ? 'Mettre à jour' : 'Créer le produit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<style scoped>
</style>
