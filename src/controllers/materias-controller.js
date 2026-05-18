import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import MateriasService from "../services/materias-service.js";

const router = Router();
const service = new MateriasService();

router.get("/", async (req, res) => {

    const materias = await service.getAllAsync();
    return res.status(StatusCodes.OK).json(materias);
});

router.get("/:id", async (req, res) => {

    const materia = await service.getByIdAsync(req.params.id);

    if (!materia) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `No se encontró la materia (id: ${req.params.id}).` });
    }

    return res.status(StatusCodes.OK).json(materia);
});

router.post("/", async (req, res) => {

    try {

        const id = await service.createAsync(req.body);

        return res.status(StatusCodes.CREATED).json(id);

    } catch (error) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {

    const rowsAffected = await service.updateAsync(req.params.id, req.body);

    if (rowsAffected === 0) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `No se encontró la materia (id: ${req.params.id}).` });
    }

    return res.status(StatusCodes.OK).json(rowsAffected);
});

router.delete("/:id", async (req, res) => {

    try {

        const rowsAffected = await service.deleteAsync(req.params.id);

        if (rowsAffected === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: `No se encontró la materia (id: ${req.params.id}).` });
        }

        return res.sendStatus(StatusCodes.OK);

    } catch (error) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                error: "No se puede eliminar la materia porque tiene calificaciones asociadas."
            });
    }
});

export default router;