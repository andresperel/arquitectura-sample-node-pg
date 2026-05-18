import db from "../configs/db-config.js";

export default class CalificacionesRepository {

    getAllAsync = async () => {

        const query = {
            text: `
                SELECT
                    c.id,
                    c.id_alumno,
                    a.nombre AS nombre_alumno,
                    a.apellido AS apellido_alumno,
                    c.id_materia,
                    m.nombre AS nombre_materia,
                    c.nota,
                    c.fecha
                FROM calificaciones c
                JOIN alumnos a ON c.id_alumno = a.id
                JOIN materias m ON c.id_materia = m.id
            `
        };

        const result = await db.query(query);
        return result.rows;
    }

    getByIdAsync = async (id) => {

        const query = {
            text: `
                SELECT
                    c.id,
                    c.id_alumno,
                    a.nombre AS nombre_alumno,
                    a.apellido AS apellido_alumno,
                    c.id_materia,
                    m.nombre AS nombre_materia,
                    c.nota,
                    c.fecha
                FROM calificaciones c
                JOIN alumnos a ON c.id_alumno = a.id
                JOIN materias m ON c.id_materia = m.id
                WHERE c.id = $1
            `,
            values: [id]
        };

        const result = await db.query(query);
        return result.rows[0];
    }

    getByAlumnoAsync = async (idAlumno) => {

        const query = {
            text: `
                SELECT
                    c.id,
                    c.id_materia,
                    m.nombre AS nombre_materia,
                    c.nota,
                    c.fecha
                FROM calificaciones c
                JOIN materias m ON c.id_materia = m.id
                WHERE c.id_alumno = $1
            `,
            values: [idAlumno]
        };

        const result = await db.query(query);
        return result.rows;
    }

    existsAsync = async (idAlumno, idMateria) => {

        const query = {
            text: `
                SELECT *
                FROM calificaciones
                WHERE id_alumno = $1
                AND id_materia = $2
            `,
            values: [idAlumno, idMateria]
        };

        const result = await db.query(query);

        return result.rows.length > 0;
    }

    createAsync = async (calificacion) => {

        const query = {
            text: `
                INSERT INTO calificaciones
                (id_alumno, id_materia, nota, fecha)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `,
            values: [
                calificacion.id_alumno,
                calificacion.id_materia,
                calificacion.nota,
                calificacion.fecha || null
            ]
        };

        const result = await db.query(query);
        return result.rows[0];
    }

    updateAsync = async (id, calificacion) => {

        const query = {
            text: `
                UPDATE calificaciones
                SET nota = $2,
                    fecha = $3
                WHERE id = $1
            `,
            values: [
                id,
                calificacion.nota,
                calificacion.fecha
            ]
        };

        const result = await db.query(query);
        return result.rowCount;
    }

    deleteAsync = async (id) => {

        const query = {
            text: `
                DELETE FROM calificaciones
                WHERE id = $1
            `,
            values: [id]
        };

        const result = await db.query(query);
        return result.rowCount;
    }
}