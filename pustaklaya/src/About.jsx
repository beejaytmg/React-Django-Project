import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">Welcome to Pustaklaya - Your Digital Library</h2>
      <p className="text-lg mb-4">
        Pustaklaya is a digital library dedicated to providing a vast collection of free books to readers around the world. Our mission is to make knowledge accessible to everyone, without any barriers.
      </p>
      <p className="mb-4">
        <strong className="text-blue-600">Open Source:</strong> Pustaklaya is an open-source project. We believe in the power of collaboration and community contributions. The entire codebase is available on GitHub, and we welcome developers to join us in improving and expanding the library.
      </p>
      <p className="mb-4">
        <strong className="text-blue-600">Free Books for All:</strong> Our library is committed to offering a diverse range of books across various genres and subjects. All the books available on Pustaklaya are completely free to read and download, ensuring that knowledge is not limited by financial constraints.
      </p>
      <p className="mb-4">
        <strong className="text-blue-600">Community Driven:</strong> Pustaklaya thrives on the support of its community. Readers, authors, and developers all play a crucial role in shaping the library. We encourage active participation, whether it's suggesting new books, reporting issues, or contributing code.
      </p>
      <p className="mb-4">
        <strong className="text-blue-600">How to Contribute:</strong> If you're passionate about literature, technology, or both, and would like to contribute to Pustaklaya, visit our GitHub repository at <a href="https://github.com/pustaklaya" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://github.com/pustaklaya</a>. We appreciate any help in making our library even better.
      </p>
      <p>
        Thank you for being a part of Pustaklaya. Happy reading!
      </p>
    </div>
  );
}

export default About;
