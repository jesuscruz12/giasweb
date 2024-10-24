const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController'); // Asegúrate de que la ruta es correcta

// Obtener todas las políticas
router.get('/', policyController.getAllPolicies);

// Crear una nueva política
router.post('/', policyController.createPolicy);

// Obtener una política por ID
router.get('/:id', policyController.getPolicyById);

// Actualizar una política por ID
router.put('/:id', policyController.updatePolicy);

// Eliminar una política por ID
router.delete('/:id', policyController.deletePolicy);

module.exports = router;