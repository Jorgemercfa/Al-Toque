import { reactive, computed } from 'vue';

const STORAGE_KEY = 'al-toque-session-company';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const initial = safeParse(localStorage.getItem(STORAGE_KEY)) || {
  company: null,
};

const state = reactive({
  company: initial.company,
});

const isCompanyAuthenticated = computed(() => !!state.company);

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      company: state.company,
    }),
  );
}

export function useSessionCompany() {
  const login = (company) => {
    state.company = {
      id: company.id,
      name: company.name,
      ruc: company.ruc,
    };
    persist();
  };

  const logout = () => {
    state.company = null;
    persist();
  };

  return {
    state,
    isCompanyAuthenticated,
    login,
    logout,
  };
}
