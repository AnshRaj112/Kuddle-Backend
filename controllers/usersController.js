const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
    try {
        console.log("Signup request received:", req.body);

        const { firstName, lastName, phone, email, year, branch, password } = req.body;

        // Validate incoming data
        if (!firstName || !lastName || !phone || !email || !year || !branch || !password) {
            return res.status(400).json({ msg: "All fields are required", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ msg: "Email already used", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            phone,
            email,
            year,
            branch,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        console.log("User created:", user);

        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.confirmPassword;

        return res.json({ status: true, user: userResponse });
    } catch (ex) {
        console.error("Signup error:", ex);
        return res.status(500).json({ msg: "Internal Server Error", status: false });
    }
};
