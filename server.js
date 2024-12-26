require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");  // package to hash passwords
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const verifyToken = require("./verfiyToken");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// mongoDB connection
mongoose
    .connect("mongodb://localhost:27017/fastPay")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));

// Schema and model definitions

//use schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 1000,
    },
    upiId: {
        type: String,
        required: true,
        unique: true,
    },
    transactions: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Transactions",
        }
    ]
});

const User = mongoose.model("User", userSchema);

// transaction schema
const transactionSchema = new mongoose.Schema({
    sender_upi_id: {
        type: String,
        required: true,
    },
    receiver_upi_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const Transaction = mongoose.model("Transactions", transactionSchema);


// function to generate unique UPI IDs
const generateUPI = (length = 5) => {
    const id = crypto.randomBytes(5).toString("hex")
    return `${id}@quickpurse`
}

//routes
//signup route
app.post("/api/signup", async (req, res) => {
    try{

        const { name, phone, email, password } = req.body;
        const foundUser = await User.findOne({email});
        if (foundUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const balance = 1000;
        const newUser = new User({
            name,
            phone,
            email,
            password: hashPassword,
            balance,
            upiId: generateUPI(),
        })
        
        const savedUser = await newUser.save();
        res.status(201).json({savedUser})
    } catch (err){
        res.status(500).json(err)
    }
});

// login route
app.post("/api/login", async (req, res) => {
    try{
        const { email, password, phone } = req.body;
        const user = await User.findOne({ $or: [{email}, {phone}] });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("access_token", token).status(200).json({ user });
        
    } catch (err){
        console.log(err)
        res.status(500).json({message: "Oops! Something went wrong."})
    }
})

app.get('/api/auth/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }    
})

app.post('/api/send', verifyToken, async (req, res) => {
    try {
        const {upiId, amount} = req.body;
        const receiver = await User.findOne({upiId})
        const sender = await User.findById(req.user._id)
        receiver.balance = Number(receiver.balance) + Number(amount);
        sender.balance -= Number(amount);
        const transaction = new Transaction({
            sender_upi_id: sender.upiId,
            receiver_upi_id: receiver.upiId,
            amount,
        })
        sender.transactions.push(transaction)
        receiver.transactions.push(transaction)
        await receiver.save();
        await sender.save();
        await transaction.save();
        res.status(200).json({message: "Transaction successful"})
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.get('/api/transactions/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('transactions');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ transactions: user.transactions });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("server listening on port " + port));
