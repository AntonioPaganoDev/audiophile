import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(true)

  let initPromise = null // <-- cachea la Promise, non solo un booleano

  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isAuthenticated = computed(() => !!user.value)

  function init() {
    if (initPromise) return initPromise // già in corso o già fatto: riusa la stessa promise

    initPromise = (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        user.value = session.user
        await fetchProfile()
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'INITIAL_SESSION') return

        user.value = session?.user ?? null
        profile.value = null
        if (session) await fetchProfile()
      })

      loading.value = false
    })()

    return initPromise
  }

  async function fetchProfile() {
    const { data } = await supabase.from('profiles').select('role').eq('id', user.value.id).single()

    profile.value = data
  }

  async function register(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  return { user, profile, loading, isAdmin, isAuthenticated, init, register, login, logout }
})
