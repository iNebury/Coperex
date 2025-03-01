import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Compañia from "../compañia/compañia.model.js"

export const registrarCompañia = async (req, res) => {
    try {
        const data = req.body;
        const { fundacion } = data; 

        const añosDeTrayectoria = new Date().getFullYear() - fundacion;

        data.añosDeTrayectoria = añosDeTrayectoria;

        const compañia = await Compañia.create(data);

        return res.status(201).json({
            message: "Compañía creada",
            compañia
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se ha podido crear la compañía",
            error: error.message
        });
    }
};


export const actualizarCompañia = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const compañia = await Compañia.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Compañia Actualizada",
            compañia,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar Compañia",
            error: err.message
        });
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const listarCompañias = async (req, res) => {
    try {
        const { filtro, valor } = req.body;

        if (!filtro) {
            return res.status(400).json({ message: "El campo 'filtro' es requerido" });
        }

        let consulta = {};
        let ordenamiento = {};

        switch (String(filtro)) {
            case "1":
                if (!valor) return res.status(400).json({ message: "El campo 'valor' es requerido para el filtro 1" });
                consulta.añosDeTrayectoria = Number(valor);
                break;
            case "2":
                if (!valor) return res.status(400).json({ message: "El campo 'valor' es requerido para el filtro 2" });
                consulta.categoria = valor;
                break;
            case "3":
                ordenamiento.nombre = 1;
                break;
            case "4":
                ordenamiento.nombre = -1;
                break;
            default:
                return res.status(400).json({
                    message: "Filtro inválido. Opciones: 1 (Años), 2 (Categoría), 3 (A-Z), 4 (Z-A)"
                });
        }

        const companias = await Compañia.find(consulta).sort(ordenamiento);

        if (companias.length === 0) {
            return res.status(404).json({ message: "No se encontraron compañías" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Compañías");

        // 📌 Definir las columnas
        worksheet.columns = [
            { header: "ID", key: "id", width: 30 },
            { header: "Nombre", key: "nombre", width: 25 },
            { header: "Años de Trayectoria", key: "añosDeTrayectoria", width: 20 },
            { header: "Impacto", key: "impacto", width: 30 },
            { header: "Email", key: "email", width: 25 },
            { header: "Teléfono", key: "telefono", width: 15 },
            { header: "Dirección", key: "direccion", width: 30 },
            { header: "Categoría", key: "categoria", width: 15 },
            { header: "Estado", key: "status", width: 10 }
        ];

        companias.forEach(compania => {
            worksheet.addRow({
                id: compania._id,
                nombre: compania.nombre,
                añosDeTrayectoria: compania.añosDeTrayectoria,
                impacto: compania.impacto,
                email: compania.email,
                telefono: compania.telefono,
                direccion: compania.direccion,
                categoria: compania.categoria,
                status: compania.status ? "Activo" : "Inactivo"
            });
        });

        worksheet.getRow(1).font = { bold: true };

        const exportFolder = path.join(__dirname, "./reports");
        if (!fs.existsSync(exportFolder)) {
            fs.mkdirSync(exportFolder, { recursive: true });
        }

        const fileName = `companias_${Date.now()}.xlsx`;
        const filePath = path.join(exportFolder, fileName);

        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            message: "Archivo Excel generado correctamente",
            companias,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al generar el archivo Excel",
            error: error.message
        });
    }
};


