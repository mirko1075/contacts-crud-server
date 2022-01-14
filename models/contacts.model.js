const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: String, 
    city:String, 
    cap:String, 
    tel:String, 
    mail: String, 
    done: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Contact = mongoose.model("Contacts", contactsSchema);

module.exports = Contact;
