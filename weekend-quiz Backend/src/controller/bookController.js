import axios from "axios";
const seed = 100;

class bookController {
    getBook = async (req, res) => {
        try {
            const { limit = 15 } = req.query;
            const {data: { data : books } } = await axios.get(`https://fakerapi.it/api/V2/books?_quantity=${limit}&_seed=${seed}`);

            res.send(books);

        } catch (error) {
            res.send(error);
        }
    }

    findBook = async (req, res) => {
        try {
            res.setHeader("Publisher", "JavaScript Developer Class");

            const { id } = req.params;
            const { data: { data: books } } = await axios.get(`https://fakerapi.it/api/V2/books?_quantity=${id}&_seed=${seed}`);
            const bookFound = books.at(-1);

            if(!bookFound) throw new Error("Book not found");

            Object.defineProperty(bookFound, "Publisher", {value:"Javascript Developer Class"});

            res.send(bookFound);

        } catch (error) {
            res.send(error);
        }
    }
}

export const bookController = new bookController();