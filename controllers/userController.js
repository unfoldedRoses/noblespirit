const { User } = require('../models');

// Get all learners
const getLearners = async (req, res) => {
  try {
    const learners = await User.findAll({ where: { role: 'learner' } });

    res.status(200).json({ learners });
  } catch (error) {
    console.error('Error retrieving learners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Other learner controller methods...

module.exports = {
  getLearners,
  // Other learner controller methods...
};
