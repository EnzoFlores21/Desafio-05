import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import { Server } from "socket.io"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"

import __dirname from "./dirname.js"
import { password, db_name, PORT } from "./env.js"
import productRouter from "./routes/product.routes.js"
import viewsRouter from "./routes/views.routes.js"
import cartRouter from "./routes/cart.routes.js"
import Handlebars from "handlebars"
import messageDao from "./daos/dbManager/message.dao.js"

// Mongoose
mongoose.connect(
    `mongodb+srv://enzoflores21:${password}@clusterprueba.zwqxjbs.mongodb.net/${db_name}?retryWrites=true&w=majority`
)
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => {
        console.log("Hubo un error");
        console.log(err)
    })

// Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
)

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))


// Socket
const io = new Server()

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("post_send", async (data) => {
        console.log(data);
        try {
            const message = new messageDao(
                data.user,
                data.message
            );
            await messageDao.saveMessage(message);
            socket.emit("message", messageDao.getMessage());
        } catch (error) {
            console.log(error);
        }
    });

    socket.emit("posts", messageDao.getMessage());
});

// Routes
app.use("/api/products", productRouter);
app.use("/", viewsRouter);
app.use("/api/carts", cartRouter)

// Levantar Servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))