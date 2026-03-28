export const createUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(201).json({ message: "User created successfully" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const login = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
