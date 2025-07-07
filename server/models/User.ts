import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  loginHistory: Array<{
    ip: string
    userAgent: string
    success: boolean
    timestamp: Date
  }>
  comparePassword(candidatePassword: string): Promise<boolean>
  avatar: string
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  loginHistory: [{
    ip: String,
    userAgent: String,
    success: Boolean,
    timestamp: Date
  }],
  avatar: { type: String, default: '' }
})

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  console.log('Comparing passwords...')
  console.log('Stored password hash:', this.password)
  console.log('Candidate password:', candidatePassword)
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  console.log('Password match result:', isMatch)
  return isMatch
}

export default mongoose.model<IUser>('User', userSchema)