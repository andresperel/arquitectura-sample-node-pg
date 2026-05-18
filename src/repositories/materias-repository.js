import db from "../configs/db-config.js";

export default class MateriasRepository {

    getAllAsync = async () => {
        const query = {
            text: "SELECT * FROM materias"
        };

        const result = await db.query(query);
        return result.rows;
    }

    getByIdAsync = async (id) => {
        const query = {
            text: "SELECT * FROM materias WHERE id = $1",
            values: [id]
        };

        const result = await db.query(query);
        return result.rows[0];
    }

    createAsync = async (materia) => {
        const query = {
            text: `
                INSERT INTO materias (nombre)
                VALUES ($1)
                RETURNING id
            `,
            values: [materia.nombre]
        };

        const result = await db.query(query);
        return result.rows[0].id;
    }

    updateAsync = async (id, materia) => {
        const query = {
            text: `
                UPDATE materias
                SET nombre = $2
                WHERE id = $1
            `,
            values: [id, materia.nombre]
        };

        const result = await db.query(query);
        return result.rowCount;
    }

    deleteAsync = async (id) => {
        const query = {
            text: "DELETE FROM materias WHERE id = $1",
            values: [id]
        };

        const result = await db.query(query);
        return result.rowCount;
    }
}