import { createStore } from "vuex";
import { getFirestore, collection, onSnapshot,getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../firebaseConfig";
const db = getFirestore(firebaseApp);
const usuariosRef = collection(db, 'usuarios');

const store = createStore({
    state(){
        return{
            usuarios: [],
        };
    },
    getters: {
        usuarios: (state) => state.usuarios,
    },
    actions: {
        async cargarUsuarios({ commit }) {
            try {
                const querySnapshot = await getDocs(collection(db, "usuarios"));
                const usuarios = [];
                querySnapshot.forEach((doc) => {
                    usuarios.push({ id: doc.id, ...doc.data() });
                });
                commit("SET_USUARIOS", usuarios);
            } catch (error) {
                console.error(error);
            }
        },
        async agregarUsuario({ dispatch, state }, nuevoUsuario) {
            try {
                await addDoc(collection(db, "usuarios"), nuevoUsuario);
                dispatch("cargarUsuarios");
            } catch (error) {
                console.error("Error al agregar usuario:", error);
            }
        },
        async eliminarUsuario({ dispatch }, usuarioId) {
            try {
                console.log("Eliminando usuario con ID:", usuarioId);
                const usuariosRef = doc(db, "usuarios", usuarioId);
                await deleteDoc(usuariosRef);
                dispatch("cargarUsuarios");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        },
        async actualizarUsuario({ dispatch }, usuario) {
            try {
                const usuariosRef = doc(db, "usuarios", usuario.id);
                await updateDoc(usuariosRef, {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                });
                dispatch("cargarUsuarios");
            } catch (error) {
                console.error("Error al actualizar usuario:", error);
            }
        },
        
        
    },
    mutations: {
        SET_USUARIOS(state, usuarios) {
            state.usuarios = usuarios;
        },
    },
    
});

export default store;
