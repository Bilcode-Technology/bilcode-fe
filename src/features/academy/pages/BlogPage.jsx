import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.jsx';
import { Search, X } from 'lucide-react';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = useMemo(() => {
    const allTags = blogPosts.reduce((acc, post) => {
      post.tags.forEach(tag => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);
    return ['All', ...allTags];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => {
        if (selectedTag === 'All') return true;
        return post.tags.includes(selectedTag);
      })
      .filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [searchQuery, selectedTag]);

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">The Bilcode Blog</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the world of software development.
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search for a post..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="relative w-full md:w-auto">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            { (searchQuery || selectedTag !== 'All') &&
              <button onClick={() => { setSearchQuery(''); setSelectedTag('All'); }} className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full">
                <X className="h-5 w-5" />
              </button>
            }
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <Link to={`/academy/blog/${post.id}`} key={post.id} className="block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <div className="relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.summary}</p>
                  <div className="text-sm text-slate-500">
                    <span>By {post.author}</span> &middot; <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800">No Posts Found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;