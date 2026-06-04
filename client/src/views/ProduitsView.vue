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
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal state
// ... existing modal state code ...
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
    const response = await api.get('/produits');
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
    const response = await api.get('/categories');
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
      await api.put(`/produits/${productForm.id}`, productForm);
    } else {
      await api.post('/produits', productForm);
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
    await api.delete(`/produits/${id}`);
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

const paginatedProduits = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedProduits.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedProduits.value.length / itemsPerPage);
});

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
          Nouveau produit
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="relative max-w-md">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un produit..."
        class="neumorphic-input pl-12"
      />
      <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/50">
        🔍
      </span>
    </div>

    <!-- Table -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
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
        </div>

        <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
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
              <option value="">Sélectionner une catégorie</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nom }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-bold text-text mb-1">URL Image</label>
            <input v-model="productForm.image" type="text" class="neumorphic-input" placeholder="https://..." />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-text mb-1">Description</label>
            <textarea v-model="productForm.description" class="neumorphic-input h-24 resize-none"></textarea>
          </div>

          <div v-if="formError" class="md:col-span-2 bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm font-bold">
            {{ formError }}
          </div>

          <div class="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" @click="closeModal" class="neumorphic-btn bg-surface text-text">
              Annuler
            </button>
            <button type="submit" class="neumorphic-btn bg-primary text-secondary" :disabled="formLoading">
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
