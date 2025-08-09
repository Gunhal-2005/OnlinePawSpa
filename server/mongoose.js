const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    age: Number
});

const User = mongoose.model('User', userSchema);