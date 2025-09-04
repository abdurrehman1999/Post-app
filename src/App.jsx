import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [postText, setPostText] = useState("");
  // const [error, setError] = useState("");
  const [allpost, setAllPost] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [error, setError] = useState("")


  const getPost = async () => {
    try {
      const postGet = await axios.get('https://68b54396e5dc090291ae67f3.mockapi.io/posts')
      // console.log(postGet.data);
      setAllPost(postGet?.data)
      console.log(allpost)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  const postHandler = async () => {

    // console.log(postText)

    const postData = {
      postText,
      likes:0

    }

    if (postText === "") {
      setError("Post is Empty");
      return;
    }
    setError("");
    try {
      const res = await axios.post('https://68b54396e5dc090291ae67f3.mockapi.io/posts', postData)
      setPostText("");
      getPost();
    } catch (error) {

      console.log(error)

    }

  }
  const updateHandler = (id, post) => {
    setUpdateId(id);
    setPostText(post.postText)
  }

  const editPostHandler = async () => {
    const updatePost = {
      postText

    }
    setPostText("");

    try {
      const editPost = await axios.put(`https://68b54396e5dc090291ae67f3.mockapi.io/posts/${updateId}`, updatePost)
      getPost()

    } catch (error) {
    }

  }

  const likeHandler = async (id, currentLikes) => {
    try {
      const updatedPost = {
        likes: currentLikes + 1
      };
      await axios.put(`https://68b54396e5dc090291ae67f3.mockapi.io/posts/${id}`, updatedPost);
      getPost(); // refresh posts after update
    } catch (error) {
      console.log(error);
    }
  };


  const deleteHandler = async (id) => {
    try {
      const deletePost = await axios.delete(`https://68b54396e5dc090291ae67f3.mockapi.io/posts/${id}`)
      getPost()

    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div className='addpost'>
      <div className="manage">
        <h1>POST MANAGER</h1>
        <p>Create your posts</p>
      </div>
      <div className='input-row'>
        <h3>Create Post :</h3>
        <input type='text' value={postText} onChange={(e) => setPostText(e.target.value)} ></input>
        <div className="error">{error}</div>
        <br></br>{
          updateId ? <button onClick={() => editPostHandler(updateId)}>Update Post</button> : <button type='submit' onClick={postHandler} >Post</button>

        }
      </div>

      <h2>ALL POSTS</h2>
      {
        allpost.map((post) => (
          <div>
            <p>{post.postText}</p>
            <div className='post-actions'>
              <button onClick={() => likeHandler(post.id, post.likes)}>{post.likes}      Like</button>
              <button onClick={() => updateHandler(post.id, post)}>Edit</button>
              <button onClick={() => deleteHandler(post.id)}>Delete</button>
            </div>
          </div>

        ))

      }




    </div>

  )
}

export default App
