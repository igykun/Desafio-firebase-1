<template>
    <div class="table-container">
        <h1 class="title">Lista de Usuarios</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo electronico</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.apellido }}</td>
                    <td>{{ usuario.correo }}</td>
                    <td>
                        <button class="btn eliminar-btn m-2" @click="eliminarUsuario(usuario.id)">
                            Eliminar
                        </button>
                        <button class="btn modificar-btn m-2" @click="seleccionarUsuario(usuario)">
                            Modificar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr>
    <section v-if="usuarioSeleccionado" class="updateSection container">
        <h2>Modificar Usuario</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo electronico</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            v-model="usuarioSeleccionado.nombre"
                            placeholder="Nombre"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="usuarioSeleccionado.apellido"
                            placeholder="Apellido"
                        />
                    </td>
                    <td>
                        <input
                            type="email"
                            v-model="usuarioSeleccionado.correo"
                            placeholder="Correo"
                        />
                    </td>
                    <td>
                        <button @click="modificarUsuario">
                            Aceptar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "FirebaseComponent",
    data() {
        return {
            usuarioSeleccionado: null,
        };
    },
    computed: {
        ...mapGetters(["usuarios"]),
    },
    methods: {
        ...mapActions(["cargarUsuarios", "eliminarUsuario", "actualizarUsuario"]),
        seleccionarUsuario(usuario) {
            this.usuarioSeleccionado = { ...usuario };
        },
        async modificarUsuario() {
            if (this.usuarioSeleccionado) {
                await this.actualizarUsuario(this.usuarioSeleccionado);
                this.usuarioSeleccionado = null;
            }
        },
    },
    mounted() {
        this.cargarUsuarios();
    },
};
</script>

<style scoped>

body {
    background: radial-gradient(circle, #ffffff 20%, #ffefeb 100%);
    background-size: cover;
    font-family: 'Oswald', sans-serif;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

.table-container {
    margin: 30px auto;
    width: 90%;
    max-width: 1200px;
    background: #ffeaa7;
    border: 4px solid #2d3436;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    transform: rotate(-1deg);
}

.title {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: #d63031;
    margin-bottom: 20px;
    text-shadow: 2px 2px #000;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: #fab1a0;
    font-size: 1.1rem;
    color: #2d3436;
    border-radius: 10px;
    overflow: hidden;
}

th, td {
    padding: 15px;
    text-align: center;
    border-bottom: 2px solid #2d3436;
}

th {
    background: #55efc4;
    font-weight: bold;
    color: #000;
}

tr:nth-child(even) {
    background-color: #ff7675;
}

tr:hover {
    background: #d63031;
    color: #fff;
    cursor: pointer;
}

button {
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    background: #2d3436;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    border: 3px solid #d63031;
    border-radius: 10px;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

button:hover {
    background: #d63031; 
    color: #fff;
    transform: scale(1.1); 
}

button:active {
    transform: scale(0.95);
}

.updateSection {
    background: #74b9ff; 
    border: 4px solid #2d3436;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    animation: pop-in 0.5s ease-out;
}

.updateSection h2 {
    font-size: 2rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
}

@keyframes pop-in {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

</style>