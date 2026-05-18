import MateriasRepository from "../repositories/materias-repository.js";

export default class MateriasService {

    repository = new MateriasRepository();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    createAsync = async (materia) => {

        if (!materia.nombre || materia.nombre.trim() === "") {
            throw new Error("El nombre de la materia es obligatorio.");
        }

        return await this.repository.createAsync(materia);
    }

    updateAsync = async (id, materia) => {
        return await this.repository.updateAsync(id, materia);
    }

    deleteAsync = async (id) => {
        return await this.repository.deleteAsync(id);
    }
}