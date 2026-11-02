const express = require('express');// importa el modulo de express
const books = require('./data/books.json')
// http://localhost:3000/

const app = express(); //crea el servidor
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hola, funciona?!');
});

// Crea una ruta /all para obtener todos los libros
app.get('/all', (req, res) => {
  res.status(200).json(books);
});

// Crea una ruta /first para obtener el primer libro
app.get('/first', (req, res) => {
  res.status(200).json(books[0]);
});

//Crea una ruta /last para obtener el último libro
app.get('/last', (req, res) =>{
  res.status(200).json(books.slice(-1)[0]);
})

//Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get('/middle', (req, res) =>{
  const middle = books[Math.floor( books.length / 2 )]

  res.status(200).json(middle);
})

//Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
app.get('/author/dante-alighieri', (req, res) =>{
  const libro = books.find( libro => libro.author === "Dante Alighieri" )
  res.json(libro.title);
})

//Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
app.get('/country/charles-dickens', (req, res) =>{
  const libro = books.find( libro => libro.author === "Charles Dickens" )
  res.json(libro.country);
})

//Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes
app.get('/year&pages/cervantes', (req, res) =>{
  const libro = books.find( libro => libro.author === "Miguel de Cervantes" )
  res.json({ pages: libro.pages, year: libro.year });
})

//Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get('/country/count/spain', (req, res) =>{
  const libros = books.filter( libro => libro.country === "Spain" )
  res.json(libros.length);
})

// Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get('/country/at-least/germany', (req, res) =>{
  const libros = books.some( libro => libro.country === "Germany" )
  res.json(libros);
})

//Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
app.get('/pages/all-greater/200', (req, res) =>{
  const libros = books.every( libro => libro.pages > 200 )
  res.json(libros);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});