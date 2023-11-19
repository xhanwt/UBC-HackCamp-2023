const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


userSchema.pre('save', async function (next) {
    try {
        // Only hash the password if it has been modified or is new
        if (!this.isModified('password')) {
          return next();
        }
    
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
    
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
    
        // Replace the plaintext password with the hashed password
        this.password = hashedPassword;
    
        return next();
      } catch (error) {
        return next(error);
      }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch(error) {
        throw error;
    };
}


const User = mongoose.model('User', userSchema);

module.exports = User;