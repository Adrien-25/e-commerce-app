import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        //validations
        if (!name) {
            return res.send({ error: 'Name is requiered' });
        }
        if (!email) {
            return res.send({ error: 'Email is requiered' });
        }
        if (!password) {
            return res.send({ error: 'Password is requiered' });
        }
        if (!phone) {
            return res.send({ error: 'Phone is requiered' });
        }
        if (!address) {
            return res.send({ error: 'Address is requiered' });
        }

        //check user
        const existingUser = await userModel.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Register please login',
            })
        }
        //register user
        let newPassword = password.toString();
        const hashedPassword = await hashPassword(newPassword);

        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registerd',
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.adress
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};

//test controller
export const testController = (req, res) => {
    try {
        res.send('Potected Route');
    } catch (error) {
        res.send(error);
    }
}
