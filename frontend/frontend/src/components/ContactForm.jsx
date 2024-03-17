import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., send data to a server)
        console.log('Form submitted:', formData);
        // Reset the form after submission
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };
    return (
        <div className="flex items-center justify-center py-16 bg-amber-200">
          <div className="w-full max-w-md">
            <form className="bg-gray-800 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl text-center text-amber-400 mb-6">Contact Us</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Message" rows="4"></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default ContactForm;
