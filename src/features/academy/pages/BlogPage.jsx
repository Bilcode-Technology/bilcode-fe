
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, getAllTags } from '../api';
import { Search, X } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({ search: '', tag: 'All' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBlogPosts(filters), getAllTags()]).then(([fetchedPosts, fetchedTags]) => {
      setPosts(fetchedPosts);
      setTags(fetchedTags);
      setIsLoading(false);
    });
  }, [filters]);

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">The Bilcode Blog</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">Wawasan, tutorial, dan cerita dari dunia pengembangan perangkat lunak.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Cari postingan..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.tag}
            onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
            className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center">Memuat...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link to={`/academy/blog/${post.slug}`} key={post.id} className="block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.summary}</p>
                  <div className="text-sm text-slate-500">By {post.author} &middot; {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800">Postingan Tidak Ditemukan</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
