<template>
    <form @submit.prevent="agregar" class="form-container">
        <input type="text" v-model="nombre" placeholder="Nombre" required class="input" />
        <input type="text" v-model="apellido" placeholder="Apellido" required class="input" />
        <input type="email" v-model="correo" placeholder="Correo" required class="input" />
        <button type="submit" class="btn">Agregar Usuario</button>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "AgregarUsuario",
    data() {
        return {
            nombre: "",
            apellido: "",
            correo: "",
        };
    },
    methods: {
        ...mapActions(["agregarUsuario"]),
        agregar() {
            const nuevoUsuario = {
                nombre: this.nombre,
                apellido: this.apellido,
                correo: this.correo,
            };
            this.agregarUsuario(nuevoUsuario);
            this.nombre = "";
            this.apellido = "";
            this.correo = "";
        },
    },
};
</script>

<style scoped>
.form-container {
    background: #ffeaa7; 
    border: 4px solid #2d3436; 
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    margin: 30px auto;
    text-align: center;
    transform: rotate(-1deg); 
    animation: pop-in 0.5s ease-out;
}

.input {
    width: 80%;
    padding: 12px;
    margin: 15px 0;
    border: 3px solid #2d3436;
    border-radius: 8px;
    font-size: 1.1rem;
    background: #fff;
    font-family: 'Oswald', sans-serif;
    transition: border-color 0.3s ease, transform 0.2s ease;
}

.input:focus {
    border-color: #d63031; 
    outline: none;
    transform: scale(1.05); 
}

.btn {
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    background: #2d3436;
    color: #fff;
    padding: 12px 25px;
    font-size: 1.2rem;
    border: 3px solid #d63031; 
    border-radius: 10px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
    background: #d63031; 
    color: #fff;
    transform: scale(1.1); 
}

.btn:active {
    transform: scale(0.95);
}

@keyframes pop-in {
    0% {
        transform: scale(0.8) rotate(-2deg);
        opacity: 0;
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}
</style>
