const Policy = require('../models/Policy');
const mongoose = require('mongoose');

// Obtener todas las políticas
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().select('title content version isCurrent createdAt');
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva política
exports.createPolicy = async (req, res) => {
  try {
    // Desactivar todas las políticas vigentes
    await Policy.updateMany({ isCurrent: true }, { isCurrent: false });

    // Crear la nueva versión como vigente
    const lastPolicy = await Policy.findOne().sort({ createdAt: -1 });
    const newVersion = lastPolicy ? lastPolicy.version + 1 : 1;

    const policy = new Policy({
      title: req.body.title,
      content: req.body.content,
      version: newVersion,
      isCurrent: true, // Esta es la nueva política vigente
    });

    const savedPolicy = await policy.save();
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una política por ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Política no encontrada' });
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una política
exports.updatePolicy = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID de política no válido' });
  }

  try {
    // Desactivar la política vigente actual
    await Policy.updateMany({ isCurrent: true }, { isCurrent: false });

    // Crear la nueva versión como vigente
    const lastPolicy = await Policy.findById(req.params.id);
    if (!lastPolicy) return res.status(404).json({ message: 'Política no encontrada' });
    
    const newVersion = lastPolicy.version + 1;

    const updatedPolicy = new Policy({
      title: req.body.title || lastPolicy.title,
      content: req.body.content || lastPolicy.content,
      version: newVersion,
      isCurrent: true, // Esta será la política vigente
    });

    const savedPolicy = await updatedPolicy.save();
    res.status(200).json(savedPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una política
exports.deletePolicy = async (req, res) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) return res.status(404).json({ message: 'Política no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
