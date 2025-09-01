import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.js';

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800">404 - Post Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-500">
              By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12"
          />

          <div 
            className="prose prose-lg max-w-none mx-auto text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="text-center mt-16">
            <Link to="/blog" className="text-blue-600 hover:underline font-semibold">
              &larr; Back to All Posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
