import CalificacionesRepository from "../repositories/calificaciones-repository.js";

import AlumnosService from "./alumnos-service.js";
import MateriasService from "./materias-service.js";

export default class CalificacionesService {

    repository = new CalificacionesRepository();

    alumnosService = new AlumnosService();
    materiasService = new MateriasService();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    getByAlumnoAsync = async (idAlumno) => {

        const alumno = await this.alumnosService.getByIdAsync(idAlumno);

        if (!alumno) {
            throw new Error(`El alumno con id ${idAlumno} no existe.`);
        }

        return await this.repository.getByAlumnoAsync(idAlumno);
    }

    createAsync = async (calificacion) => {

        if (
            !Number.isInteger(calificacion.nota) ||
            calificacion.nota < 0 ||
            calificacion.nota > 10
        ) {
            throw new Error("La nota debe ser un número entero entre 0 y 10.");
        }

        const alumno = await this.alumnosService.getByIdAsync(calificacion.id_alumno);

        if (!alumno) {
            throw new Error(`El alumno con id ${calificacion.id_alumno} no existe.`);
        }

        const materia = await this.materiasService.getByIdAsync(calificacion.id_materia);

        if (!materia) {
            throw new Error(`La materia con id ${calificacion.id_materia} no existe.`);
        }

        const existe = await this.repository.existsAsync(
            calificacion.id_alumno,
            calificacion.id_materia
        );

        if (existe) {
            throw new Error(
                `Ya existe una calificación para el alumno ${calificacion.id_alumno} en la materia ${calificacion.id_materia}.`
            );
        }

        return await this.repository.createAsync(calificacion);
    }

    updateAsync = async (id, calificacion) => {

        const existente = await this.repository.getByIdAsync(id);

        if (!existente) {
            throw new Error(`No se encontró la calificación (id: ${id}).`);
        }

        if (
            calificacion.nota !== undefined &&
            (
                !Number.isInteger(calificacion.nota) ||
                calificacion.nota < 0 ||
                calificacion.nota > 10
            )
        ) {
            throw new Error("La nota debe ser un número entero entre 0 y 10.");
        }

        return await this.repository.updateAsync(id, {
            nota: calificacion.nota ?? existente.nota,
            fecha: calificacion.fecha ?? existente.fecha
        });
    }

    deleteAsync = async (id) => {
        return await this.repository.deleteAsync(id);
    }
}