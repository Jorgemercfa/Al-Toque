import { reactive, computed } from 'vue';

const STORAGE_KEY = 'al-toque-session';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initial = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  companies: null,
};

const state = reactive({
  companies: initial.companies,
});

const isAuthenticated = computed(() => !!state.companies);

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      companies: state.companies,
    }),
  );
}

export function useSession() {
  const login = (companies) => {
    state.companies = {
      id: companies.id,
      name: companies.name,
      ruc: companies.ruc,
    };
    persist();
  };

  const logout = () => {
    state.companies = null;
    persist();
  };

  return {
    state,
    isAuthenticated,
    login,
    logout,
  };
}
