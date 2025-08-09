const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: from, to, amount' });
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  res.json(transferService.listTransfers());
};
