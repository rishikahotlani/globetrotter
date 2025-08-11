import City from '../models/City.js';

export async function listCities(req, res) {
  try {
    const { 
      search, 
      region, 
      costLevel, 
      sortBy = 'name', 
      sortOrder = 'asc',
      limit = 50,
      page = 1
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { region: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (region) {
      filter.region = { $regex: region, $options: 'i' };
    }
    
    if (costLevel) {
      filter.costLevel = costLevel;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cities = await City.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await City.countDocuments(filter);

    res.json({
      cities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities', details: error.message });
  }
}

export async function getCityById(req, res) {
  try {
    const city = await City.findById(req.params.cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json({ city });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city', details: error.message });
  }
}

export async function createCity(req, res) {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json({ city });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create city', details: error.message });
  }
}

export async function updateCity(req, res) {
  try {
    const city = await City.findByIdAndUpdate(
      req.params.cityId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    res.json({ city });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update city', details: error.message });
  }
}

export async function deleteCity(req, res) {
  try {
    const city = await City.findByIdAndDelete(req.params.cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city', details: error.message });
  }
}
