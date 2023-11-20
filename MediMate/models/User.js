const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    status: { type: String, enum: ['current', 'past'], default: 'current'},
    startDate: { type: Date, default: Date.now },
    stopDate: { type: Date },
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    healthCardNumber: { type: String, required: true },
    medications: [medicationSchema],
});

userSchema.methods.addMedication = async function (medication) {
    try {
      this.medications.push(medication);
      await this.save();
    } catch (error) {
      throw error;
    }
  };


const User = mongoose.model('User', userSchema);

module.exports = User;