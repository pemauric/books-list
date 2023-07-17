const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const port = 3000


const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(express.urlencoded ({ 
        extended: true
    })
)

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home')
});

app.post('/books/insertbooks', (req, res) => {
    const title_name = req.body.title_name
    const pages_qyt = req.body.pagesqty

    const query = `INSERT INTO books (??, ??) VALUES(? , ?)`
    const data = ['title', 'pageqty', title_name, pages_qyt]
    
    conn.query(query, data, (err) => {
        if (err) {
            console.log(err);
        }
    })

    res.redirect('/books')
})

app.get('/books', (req, res) => {
    
    const sql = `SELECT * FROM books`

    conn.query(sql, (err, data) => {
        
        if (err) {
            console.log(err);
        }
        
        const books = data

        console.log(books)

        res.render('books', {books})
    })

})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]
    
    conn.query(sql, data, (err, data) => {
        if (err) {
            console.log(err);
        }

        const books = data[0]
        
        console.log(books)

        res.render('book', {books})
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, (err, data) => {
        if (err) {
            console.log(err);
        }

        const books = data[0]

        console.log(books)
        
        res.render('edit', {books})
    })

})

app.post('/books/updatebooks', (req, res) => {
    
    const id = req.body.id
    const qty = req.body.pagesqty
    const title = req.body.title_name
    
    //const sql = `UPDATE books SET pageqty = '${qty}', title = '${title}' WHERE id = ${id}`
    
    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`

    const data = ['pageqty', qty, 'title', title, 'id', id];

    conn.query(sql, data, (err) => {
        if (err) {
            console.log(err);
        }
    })
    
    res.redirect('/books')
})

app.post('/books/:id/remove', (req, res) => {
    
    const id = req.params.id
    
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, (err) => {
        if (err) {
            console.log(err);
        }
    })
    
    res.redirect('/books')
})




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




