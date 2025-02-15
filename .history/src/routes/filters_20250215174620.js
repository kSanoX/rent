router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();
    console.log('Filters fetched:', filters);  // Логирование данных фильтров
    res.json(filters);
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});
