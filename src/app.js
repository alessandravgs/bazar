import express from "express";
import UserRoutes from "./routes/UserRoute.js";
import connectDB from './database/db.js';
import ProductRoutes from "./routes/ProductRoute.js";

const app = express();
app.use(express.json());
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

connectDB().then(() => {
    const PORT = process.env.PORT || 3000; // Valor padrão para a porta
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(process.env.PORT, ()=>{
//     console.log(`Server listen in port ${process.env.PORT}`);
// });