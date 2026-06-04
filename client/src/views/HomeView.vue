<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/api';

const produits = ref([]);
const categories = ref([]);
const loading = ref(true);

const fetchDashboardData = async () => {
  loading.value = true;
  try {
    const [pRes, cRes] = await Promise.all([
<<<<<<< HEAD
      api.get('/produits'),
      api.get('/categories')
=======
      api.get('/api/produits'),
      api.get('/api/categories')
>>>>>>> 53d7e9f (first commit)
    ]);
    produits.value = pRes.data;
    categories.value = cRes.data;
  } catch (err) {
    console.error("Erreur stats:", err);
  } finally {
    loading.value = false;
  }
};

const stats = computed(() => ({
  totalProduits: produits.value.length,
  totalCategories: categories.value.length,
  valeurStock: produits.value.reduce((acc, p) => acc + (parseFloat(p.prix) * (p.stock || 0)), 0)
}));

const topStockouts = computed(() => {
  return [...produits.value]
    .sort((a, b) => a.stock - b.stock)
    .filter(p => p.stock <= 5)
    .slice(0, 5);
});

const productsByCategory = computed(() => {
  const distribution = {};
  categories.value.forEach(cat => {
    distribution[cat.nom] = produits.value.filter(p => p.categorieId === cat.id).length;
  });
  return Object.entries(distribution)
    .sort(([, a], [, b]) => b - a);
});

onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="space-y-8">
    <div>
<<<<<<< HEAD
      <h1 class="text-3xl font-bold text-text mb-1">Tableau de Bord</h1>
      <p class="text-text/70">Aperçu de votre activité et statistiques clés</p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-text/70">Chargement des données du tableau de bord...</p>
=======
      <h1 class="text-3xl font-bold text-white mb-1">Tableau de Bord</h1>
      <p class="text-gray-400">Aperçu de votre activité et statistiques clés</p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <svg class="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-400">Chargement des données du tableau de bord...</p>
>>>>>>> 53d7e9f (first commit)
    </div>

    <div v-else class="space-y-8 animate-in fade-in duration-500">
      <!-- Stats Grid -->
<<<<<<< HEAD
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="neumorphic-panel flex items-center gap-4">
          <div class="p-4 rounded-xl shadow-neumorphic-inset text-primary">
=======
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-panel p-6 flex items-center gap-4">
          <div class="p-3 bg-primary/20 rounded-lg text-primary">
>>>>>>> 53d7e9f (first commit)
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
<<<<<<< HEAD
            <p class="text-sm font-bold text-text/60">Total Produits</p>
            <h3 class="text-2xl font-bold text-text">{{ stats.totalProduits }}</h3>
          </div>
        </div>

        <div class="neumorphic-panel flex items-center gap-4">
          <div class="p-4 rounded-xl shadow-neumorphic-inset text-success">
=======
            <p class="text-sm font-medium text-gray-400">Total Produits</p>
            <h3 class="text-2xl font-bold text-white">{{ stats.totalProduits }}</h3>
          </div>
        </div>

        <div class="glass-panel p-6 flex items-center gap-4">
          <div class="p-3 bg-success/20 rounded-lg text-success">
>>>>>>> 53d7e9f (first commit)
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
<<<<<<< HEAD
            <p class="text-sm font-bold text-text/60">Valeur du Stock</p>
            <h3 class="text-2xl font-bold text-text">{{ Math.round(stats.valeurStock).toLocaleString() }}€</h3>
          </div>
        </div>

        <div class="neumorphic-panel flex items-center gap-4">
          <div class="p-4 rounded-xl shadow-neumorphic-inset text-warning">
=======
            <p class="text-sm font-medium text-gray-400">Valeur du Stock</p>
            <h3 class="text-2xl font-bold text-white">{{ Math.round(stats.valeurStock).toLocaleString() }}€</h3>
          </div>
        </div>

        <div class="glass-panel p-6 flex items-center gap-4">
          <div class="p-3 bg-warning/20 rounded-lg text-warning">
>>>>>>> 53d7e9f (first commit)
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
<<<<<<< HEAD
            <p class="text-sm font-bold text-text/60">Catégories</p>
            <h3 class="text-2xl font-bold text-text">{{ stats.totalCategories }}</h3>
=======
            <p class="text-sm font-medium text-gray-400">Catégories</p>
            <h3 class="text-2xl font-bold text-white">{{ stats.totalCategories }}</h3>
>>>>>>> 53d7e9f (first commit)
          </div>
        </div>
      </div>

      <!-- Secondary Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
<<<<<<< HEAD
        <!-- Distribution Chart -->
        <div class="neumorphic-panel">
          <h3 class="text-lg font-bold text-text mb-6">Produits par catégorie</h3>
          <div class="space-y-6">
            <div v-for="[cat, count] in productsByCategory" :key="cat" class="space-y-2">
              <div class="flex justify-between text-sm font-bold">
                <span class="text-text/70">{{ cat }}</span>
                <span class="text-primary">{{ count }}</span>
              </div>
              <div class="w-full h-3 rounded-lg shadow-neumorphic-inset overflow-hidden">
                <div 
                  class="bg-primary h-full rounded-lg transition-all duration-1000"
=======
        <!-- Distribution Chart Placeholder -->
        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Produits par catégorie</h3>
          <div class="space-y-4">
            <div v-for="[cat, count] in productsByCategory" :key="cat" class="space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-300">{{ cat }}</span>
                <span class="text-primary font-medium">{{ count }}</span>
              </div>
              <div class="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div 
                  class="bg-primary h-full rounded-full transition-all duration-1000"
>>>>>>> 53d7e9f (first commit)
                  :style="{ width: `${(count / stats.totalProduits) * 100}%` }"
                ></div>
              </div>
            </div>
<<<<<<< HEAD
            <div v-if="productsByCategory.length === 0" class="text-center py-10 text-text/50 italic">
=======
            <div v-if="productsByCategory.length === 0" class="text-center py-10 text-gray-500 italic">
>>>>>>> 53d7e9f (first commit)
              Aucune donnée à afficher
            </div>
          </div>
        </div>

        <!-- Stockouts Table -->
<<<<<<< HEAD
        <div class="neumorphic-panel">
          <h3 class="text-lg font-bold text-text mb-6">Top 5 produits en rupture</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-xs font-bold text-text/50 uppercase tracking-widest border-b border-text/10">
                  <th class="pb-4 px-2">Produit</th>
                  <th class="pb-4 px-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-text/10">
                <tr v-for="p in topStockouts" :key="p.id">
                  <td class="py-4 px-2 text-sm font-bold text-text">{{ p.nom }}</td>
                  <td class="py-4 px-2 text-right text-sm font-bold">
                    <span :class="p.stock === 0 ? 'text-danger' : 'text-warning'">
=======
        <div class="glass-panel p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Top 5 produits en rupture</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/10">
                  <th class="pb-3 px-2">Produit</th>
                  <th class="pb-3 px-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr v-for="p in topStockouts" :key="p.id" class="text-sm hover:bg-white/5 transition-colors">
                  <td class="py-3 px-2 text-gray-300">{{ p.nom }}</td>
                  <td class="py-3 px-2 text-right">
                    <span :class="p.stock === 0 ? 'text-danger font-bold' : 'text-warning font-medium'">
>>>>>>> 53d7e9f (first commit)
                      {{ p.stock }}
                    </span>
                  </td>
                </tr>
                <tr v-if="topStockouts.length === 0">
<<<<<<< HEAD
                  <td colspan="2" class="py-10 text-center text-text/50 italic">
=======
                  <td colspan="2" class="py-10 text-center text-gray-500 italic">
>>>>>>> 53d7e9f (first commit)
                    Aucun produit en rupture de stock
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
