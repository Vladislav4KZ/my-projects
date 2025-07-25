import React, { useState } from 'react';
import '../styles/Comments.css';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.text) {
      const comment = {
        id: Date.now(),
        name: newComment.name,
        text: newComment.text,
        date: new Date().toLocaleDateString()
      };
      setComments(prev => [...prev, comment]);
      setNewComment({ name: '', text: '' });
    }
  };

  return (
    <div className="comments-section">
      <h3>Комментарии</h3>
      
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={newComment.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="text"
            placeholder="Ваш комментарий"
            value={newComment.text}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Отправить</button>
      </form>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.name}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;