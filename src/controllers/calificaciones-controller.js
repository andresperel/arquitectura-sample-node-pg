import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import CalificacionesService from "../services/calificaciones-service.js";

const router = Router();
const service = new CalificacionesService();

router.get("/", async (req, res) => {

    const calificaciones = await service.getAllAsync();

    return res
        .status(StatusCodes.OK)
        .json(calificaciones);
});

router.get("/:id", async (req, res) => {

    const calificacion = await service.getByIdAsync(req.params.id);

    if (!calificacion) {

        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                error: `No se encontró la calificación (id: ${req.params.id}).`
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(calificacion);
});

router.get("/alumno/:idAlumno", async (req, res) => {

    try {

        const calificaciones = await service.getByAlumnoAsync(
            req.params.idAlumno
        );

        return res
            .status(StatusCodes.OK)
            .json(calificaciones);

    } catch (error) {

        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                error: error.message
            });
    }
});

router.post("/", async (req, res) => {

    try {

        const nuevaCalificacion = await service.createAsync(req.body);

        return res
            .status(StatusCodes.CREATED)
            .json(nuevaCalificacion);

    } catch (error) {

        if (error.message.includes("Ya existe")) {

            return res
                .status(StatusCodes.CONFLICT)
                .json({
                    error: error.message
                });
        }

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                error: error.message
            });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const rowsAffected = await service.updateAsync(
            req.params.id,
            req.body
        );

        return res
            .status(StatusCodes.OK)
            .json(rowsAffected);

    } catch (error) {

        if (error.message.includes("No se encontró")) {

            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    error: error.message
                });
        }

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                error: error.message
            });
    }
});

router.delete("/:id", async (req, res) => {

    const rowsAffected = await service.deleteAsync(req.params.id);

    if (rowsAffected === 0) {

        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                error: `No se encontró la calificación (id: ${req.params.id}).`
            });
    }

    return res.sendStatus(StatusCodes.OK);
});

export default router;