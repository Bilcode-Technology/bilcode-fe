import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.js';

const BlogPage = () => {
  return (
    <div className="bg-gray-50 pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">The Bilcode Blog</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the world of software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
              <div className="relative">
                <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                <div className="text-sm text-gray-500">
                  <span>By {post.author}</span> &middot; <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
