const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 2025;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const pets = [
  {
    id: 1,
    name: "Buddy",
    species: "Dog",
    age: 2,
    adopted: false,
    medicalHistory: ["Vaccinated", "Neutered"],
    dateAdded: "2025-01-01",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 2,
    name: "Noodles",
    species: "Cat",
    age: "3 months",
    adopted: true,
    medicalHistory: ["Vaccinated"],
    dateAdded: "2025-01-15",
    image:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 3,
    name: "Nibbles",
    species: "Hamster",
    age: "6 months",
    adopted: false,
    medicalHistory: [],
    dateAdded: "2025-02-10",
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 4,
    name: "Luna",
    species: "Rabbit",
    age: "3 months",
    adopted: true,
    medicalHistory: ["Vaccinated"],
    dateAdded: "2025-01-15",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=300&h=300",
  },
];

//home
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    companyName: "friendly",
    pets: pets,
  });
});

//Route to get all pets
app.get("/pets", (req, res) => {
  res.status(200).json({
    status: "success",
    results: pets.length,
    data: pets,
  });

  res.render();
});

//Route to get one pet
app.get("/pets/:id", (req, res) => {
  let id = Number(req.params.id);
  let pet = pets.find((pet) => pet.id === id);

  if (pet) {
    res.status(200).json({
      status: "success",
      data: pet,
    });
  } else {
    res.status(404).json({
      msg: "Pet not found",
    });
  }
});

//Route to create/add Pet

app.post("/pets", (req, res) => {
  let new_id = pets[pets.length - 1].id + 1;
  let name = req.body.name;
  let species = req.body.species;
  let age = req.body.age;
  let adopted = req.body.adopted;
  let medicalHistory = req.body.medicalHistory;
  let dateAdded = req.body.dateAdded;
  let image = "images/default.jpg";

  if(!name || !age || !medicalHistory){
    return res.status(400).json({
        msg: 'Please fill in missing fields'
    })
  }

  const new_pet = {
    id: new_id,
    name,
    species,
    age,
    adopted,
    medicalHistory,
    dateAdded,
    image
  }

  pets.push(new_pet)

  res.location("localhost:2025/pets/" + new_id)

  res.status(201).json({
    msg: 'Pet added Successfully',
    data: new_pet
  })
});
