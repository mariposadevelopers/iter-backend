import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig.js'; 

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Título:", title);
    console.log("Contenido:", content);

    if (!title.trim() || !content) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/posts`,
        { title, content },
        { withCredentials: true }
      );
      toast.success("Publicación creada con éxito.");
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error al crear la publicación. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="px-10 w-full rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className='font-clash form-control'>
          <label className="block text-xl font-semibold text-orange-500 mb-3">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#22112224] rounded-xl w-full lg:w-1/4 px-4 py-2"
            type="text"
          />
        </div>

        <div className='font-clash form-control'>
          <label className="block text-xl font-semibold text-orange-500 mb-3 mt-4">Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#22112224] min-h-[250px] rounded-xl w-full px-4 py-2"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type='submit'
            className="font-clash text-xl text-white bg-orange-500 w-full lg:w-1/4 p-2 rounded-xl"
          >
            Crear Publicación
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
