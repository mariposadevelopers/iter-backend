import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import { ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../config/apiConfig.js'; 

const PostPage = () => {
    const navigate = useNavigate(); 
    const [post, setPost] = useState(null);     
    const { id } = useParams();

    const handleReturnRequest = () => {
      navigate('/home');
    }

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
          setPost(response.data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      } 
      fetchPost();
    }, [id]);



  return (
    <div data-theme="light" className='min-h-screen bg-base-100' >
      <Navbar/>
      <div className='post-content'>
      {post ? (
        <div className='mx-auto max-w-3xl p-10 rounded-xl mt-6 '>
          <ArrowLeft style={{cursor: "pointer"}} onClick={handleReturnRequest} />
          <h1 className='font-clash text-4xl font-bold mb-4 mt-8 text-orange-500'>{post.title}</h1>
          <div className='font-clash prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ) : (
        console.log("Loading...")
      )}
      </div>
    </div>
  )
}

export default PostPage
