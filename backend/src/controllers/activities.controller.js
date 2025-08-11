import Activity from '../models/Activity.js';

export async function listActivities(req, res) {
  try {
    const { 
      search, 
      type, 
      city, 
      country,
      minCost, 
      maxCost,
      minDuration,
      maxDuration,
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
        { description: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) {
      filter.type = type;
    }
    
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (country) {
      filter.country = { $regex: country, $options: 'i' };
    }
    
    if (minCost || maxCost) {
      filter.cost = {};
      if (minCost) filter.cost.$gte = parseFloat(minCost);
      if (maxCost) filter.cost.$lte = parseFloat(maxCost);
    }

    if (minDuration || maxDuration) {
      filter.duration = {};
      if (minDuration) filter.duration.$gte = parseInt(minDuration);
      if (maxDuration) filter.duration.$lte = parseInt(maxDuration);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const activities = await Activity.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Activity.countDocuments(filter);

    res.json({
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: error.message });
  }
}

export async function getActivityById(req, res) {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity', details: error.message });
  }
}

export async function createActivity(req, res) {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ activity });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create activity', details: error.message });
  }
}

export async function updateActivity(req, res) {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({ activity });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update activity', details: error.message });
  }
}

export async function deleteActivity(req, res) {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity', details: error.message });
  }
}
