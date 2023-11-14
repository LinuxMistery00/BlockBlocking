<template>
  <div>
    <input v-model="userName" placeholder="Enter your name" />
    <button @click="createUser">Create User</button>

    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        <li v-for="user in users" :key="user._id">{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {
  data() {
    return {
      userName: '',
      users: [],
    };
  },
  mounted() {
    this.fetchUsers(); // Chama a função ao montar o componente
  },
  methods: {
    async createUser() {
      try {
        await api.post('/api/users', { name: this.userName });
        console.log('User created successfully');
        this.fetchUsers();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await api.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
};
</script>

<style>
/* Adicione estilos conforme necessário */
</style>
