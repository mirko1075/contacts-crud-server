# mern-crud-contacts
# Contacts

### GET - Get All Contacts

[Open Request  ]()

http://localhost:3000/contact-list



### GET - Get One Contact

[Open Request  ]()

http://localhost:3000/contact-list/61e1d3ccbe31330cb7df57ba



### POST - Create one Contact

[Open Request  ]()

http://localhost:3000/contact-list

```
{
  "firstName": "Samuele",
  "lastName": "Siddi",
  "address": "Via le mani dal culo",
  "city": "Cagliari",
  "cap": "09134",
  "tel": 685307931,
  "mail": "samuele.siddi@gmail.com",
  "active": true
}
```

### PUT - Modify one contact

[Open Request  ]()

http://localhost:3000/contact-list

Make things easier for your teammates with a complete request description.

```
{
  "id": "61e1d3ccbe31330cb7df57ba",
  "firstName": "Mirko",
  "lastName": "Siddi",
  "address": "Calle Radas 23",
  "city": "Barcelona",
  "cap": "08004",
  "tel": 685307931,
  "mail": "mirko.siddi@gmail.com",
  "active": true
}

View more
```

### DEL - Delete one contact

[Open Request  ]()

http://localhost:3000/contact-list

```
{
  "id": "61e1d4cbfc77effca34182ed"
}
```
